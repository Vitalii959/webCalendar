import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  updateDoc
} from "firebase/firestore";

import type {
  CalendarCreate,
  CalendarTypes,
  CalendarUpdate
} from "../calendar.types";

import {db} from "@/shared/lib/firebase/config";

type CalendarFirestore = {
  title: string;
  ownerId: string;
  color: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
};

export const calendarRepository = {
  createCalendar: async (
    ownerId: string,
    data: CalendarCreate
  ): Promise<string> => {
    const writeCalendar = {
      title: data.title,
      color: data.color,
      ownerId: ownerId,
      createdAt: serverTimestamp(),
      updatedAt: null
    };

    const collectionRef = collection(db, `users/${ownerId}/calendars`);
    const docRef = await addDoc(collectionRef, writeCalendar);
    return docRef.id;
  },
  updateCalendar: async (ownerId: string, id: string, data: CalendarUpdate) => {
    const updatedData = {...data, updatedAt: serverTimestamp()};
    const ref = doc(db, "users", ownerId, "calendars", id);

    await updateDoc(ref, updatedData);
  },
  deleteCalendar: async (id: string, ownerId: string) => {
    const ref = doc(db, "users", ownerId, "calendars", id);

    await deleteDoc(ref);
  },
  subscribeCalendars: (
    ownerId: string,
    onChange: (calendars: CalendarTypes[]) => void
  ) => {
    if (!ownerId) return () => {};
    const ref = collection(db, "users", ownerId, "calendars");

    const unsubscribe = onSnapshot(ref, (querySnapshot) => {
      const calendarsArray: CalendarTypes[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data({
          serverTimestamps: "estimate"
        }) as CalendarFirestore;

        calendarsArray.push({
          ...data,
          id: doc.id,
          createdAt: data.createdAt?.toDate() ?? null,
          updatedAt: data.createdAt?.toDate() ?? null
        });
      });

      onChange(calendarsArray);
    });
    return unsubscribe;
  }
};
