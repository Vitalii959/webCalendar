import type {EventType} from "@/entities/event/model/types";
import {db} from "@/shared/lib/firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  Timestamp,
  updateDoc,
  where
} from "firebase/firestore";

import type {DBEvent} from "../types/event.types";
type EventTypeWithId = EventType & {userId: string};

export const addEventDB = async (event: EventTypeWithId): Promise<string> => {
  const formattedEvent = {
    ...event,
    eventDate: {
      day: Timestamp.fromDate(event.eventDate.day),
      startTime: Timestamp.fromDate(event.eventDate.startTime),
      endTime: Timestamp.fromDate(event.eventDate.endTime)
    }
  };

  const docRef = await addDoc(collection(db, "events"), formattedEvent);

  return docRef.id;
};

type RawEventType = Omit<DBEvent, "eventDate"> & {
  eventDate: {
    day: Timestamp;
    startTime: Timestamp;
    endTime: Timestamp;
  };
};

export const editEventDB = async (
  event: EventType,
  id: string,
  userId: string
): Promise<void> => {
  const docRef = doc(db, "events", id);

  const formattedEvent = {
    ...event,
    eventDate: {
      day: Timestamp.fromDate(event.eventDate.day),
      startTime: Timestamp.fromDate(event.eventDate.startTime),
      endTime: Timestamp.fromDate(event.eventDate.endTime)
    },
    userId
  };

  await updateDoc(docRef, formattedEvent);
};

export const deleteEventDB = async (id: string) => {
  const document = doc(db, "events", id);
  await deleteDoc(document);
};

export const startEventListener = (
  userId: string,
  onChange: (events: DBEvent[]) => void
) => {
  const eventRef = collection(db, "events");
  const q = query(eventRef, where("userId", "==", userId));

  return onSnapshot(q, (snapshot) => {
    const events = snapshot.docs.map((doc) => {
      const data = doc.data() as RawEventType;

      return {
        ...data,
        id: doc.id,
        eventDate: {
          day: data.eventDate.day.toDate(),
          startTime: data.eventDate.startTime.toDate(),
          endTime: data.eventDate.endTime.toDate()
        }
      };
    });

    onChange(events);
  });
};
