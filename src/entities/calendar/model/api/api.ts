import {db} from "@/shared/lib/firebase/config";
import {addDoc, collection, doc, updateDoc} from "firebase/firestore";

type CalendarType = {title: string; color: string};

export const addCalendarDB = async (
  calendar: CalendarType,
  ownerId: string
): Promise<string> => {
  const calendarWithUser = {...calendar, ownerId};
  const docRef = await addDoc(collection(db, "calendars"), calendarWithUser);
  return docRef.id;
};

export const editCalendarDB = async (calendar: CalendarType, id: string) => {
  await updateDoc(doc(db, "calendars", id), calendar);
};
export const deleteCalendarDB = async (id: string) => {
  await updateDoc(doc(db, "calendars", id), {deleted: true});
};
