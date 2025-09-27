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
import type {DBEvent, EventCreate, EventType} from "../event.types";
import {db} from "@/shared/lib/firebase/config";

type RawEventType = Omit<DBEvent, "eventDate, createdAt"> & {
  eventDate: {
    day: Timestamp;
    startTime: Timestamp;
    endTime: Timestamp;
  };
  createdAt: Timestamp;
  updatedAt?: Timestamp;
};

export const eventRepository = {
  addEvent: async (ownerId: string, event: EventCreate) => {
    const formattedEvent = {
      ...event,
      eventDate: {
        day: Timestamp.fromDate(event.eventDate.day),
        startTime: Timestamp.fromDate(event.eventDate.startTime),
        endTime: Timestamp.fromDate(event.eventDate.endTime)
      },
      createdAt: Timestamp.fromDate(event.createdAt)
    };

    const docRef = await addDoc(
      collection(db, "users", ownerId, "events"),
      formattedEvent
    );
    return docRef.id;
  },

  editEvent: async (ownerId: string, id: string, event: EventType) => {
    const formattedEvent = {
      ...event,
      eventDate: {
        day: Timestamp.fromDate(event.eventDate.day),
        startTime: Timestamp.fromDate(event.eventDate.startTime),
        endTime: Timestamp.fromDate(event.eventDate.endTime)
      },
      updatedAt: serverTimestamp()
    };

    const eventRef = doc(db, "users", ownerId, "events", id);

    await updateDoc(eventRef, formattedEvent);
  },
  deleteEvent: async (ownerId: string, id: string) => {
    const ref = doc(db, "users", ownerId, "events", id);

    await deleteDoc(ref);
  },

  startSubscription: (
    ownerId: string,
    onChange: (events: DBEvent[]) => void
  ) => {
    const col = collection(db, "users", ownerId, "events");

    return onSnapshot(col, (snapshot) => {
      const data: DBEvent[] = snapshot.docs.map((doc) => {
        const rawData = doc.data({
          serverTimestamps: "estimate"
        }) as RawEventType;

        return {
          ...rawData,
          id: doc.id,
          eventDate: {
            day: rawData.eventDate?.day?.toDate?.() ?? null,
            startTime: rawData.eventDate?.startTime?.toDate?.() ?? null,
            endTime: rawData.eventDate?.endTime?.toDate?.() ?? null
          },
          createdAt: rawData.createdAt?.toDate?.() ?? null,
          updatedAt: rawData.updatedAt?.toDate?.() ?? null
        };
      });
      onChange(data);
    });
  }
};
