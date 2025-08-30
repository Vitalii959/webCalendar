import {create} from "zustand";
import {addCalendarDB, editCalendarDB, deleteCalendarDB} from "../api";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {db} from "@/shared/lib/firebase/config";
import {useUserStore} from "@/entities/user/model/zustand";

const userName = useUserStore.getState().user?.displayName;

const defaultCalendar = {
  title: `${userName ? userName : "Default"}`,
  color: "#f87171",
  id: "default-id",
  ownerId: "default-owner-id",
  checked: true
};

type DBCalendar = {
  title: string;
  color: string;
};
type UICalendar = DBCalendar & {
  ownerId: string;
  id: string;
  checked: boolean;
};

type CalendarsStore = {
  calendars: UICalendar[];
  addCalendar: (calendar: DBCalendar, userId: string) => Promise<void>;
  editCalendar: (calendar: DBCalendar, id: string) => Promise<void>;
  deleteCalendar: (id: string) => Promise<void>;
  handleCheckboxChange: (id: string) => void;
  startCalendarListener: (userId: string) => (() => void) | void;
};

export const useCalendarStore = create<CalendarsStore>((set, get) => ({
  calendars: [],
  addCalendar: async (calendar, ownerId) => {
    try {
      await addCalendarDB(calendar, ownerId);
    } catch (e) {
      console.error("Failed to add calendar", e);
      throw e;
    }
  },
  editCalendar: async (calendar, id) => {
    await editCalendarDB(calendar, id);
  },
  deleteCalendar: async (id) => {
    await deleteCalendarDB(id);
  },
  handleCheckboxChange: (id) => {
    const updatedCalendars = get().calendars.map((calendar) =>
      calendar.id === id ? {...calendar, checked: !calendar.checked} : calendar
    );
    set({calendars: updatedCalendars});
  },
  startCalendarListener: (ownerId) => {
    if (!ownerId) return;

    const q = query(
      collection(db, "calendars"),
      where("ownerId", "==", ownerId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const calendarsArray: UICalendar[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as UICalendar;

        calendarsArray.push({...data, id: doc.id, checked: false});
      });
      set({calendars: [defaultCalendar, ...calendarsArray]});
    });

    return unsubscribe;
  }
}));
