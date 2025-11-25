import {create} from "zustand";
import type {CalendarTypes} from "@/entities/calendar/calendar.types";
import type {StatusType} from "@/shared/lib/status";
import {useUserStore} from "@/entities/user/model/useUserStore";

type CalendarStore = {
  calendars: CalendarTypes[];
  selectedIds: string[];
  calendarStatus: StatusType;
  setCalendars: (calendars: CalendarTypes[]) => void;
  toggleSelectedIds: (id: string) => void;
  setCalendarStatus: (status: StatusType) => void;
};

const defaultCalendar = (userName?: string) => ({
  title: userName ?? "Default",
  color: "#f87171",
  id: "default-id",
  ownerId: "default-owner-id",
  createdAt: new Date(),
  updatedAt: null
});

const LOCAL_SELECTED_CALENDARS_KEY = "selectedCalendars";
const localStore = {
  setItem: (key: string, value: string[]) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key: string) => {
    try {
      const response = localStorage.getItem(key);

      return response ? JSON.parse(response) : ["default-id"];
    } catch {
      return [];
    }
  }
};

export const selectedCalendarsStore = create<CalendarStore>((set) => ({
  calendars: [],
  selectedIds: localStore.getItem(LOCAL_SELECTED_CALENDARS_KEY),
  calendarStatus: "idle",

  setCalendars: (calendarsArray) => {
    const userName = useUserStore.getState().user?.displayName ?? undefined;
    const defCalendar = defaultCalendar(userName);
    set({calendars: [defCalendar, ...calendarsArray]});
  },

  toggleSelectedIds: (id) => {
    set((state) => {
      const idExist = state.selectedIds.includes(id);
      const newSelectedIds = idExist
        ? state.selectedIds.filter((x) => x !== id)
        : [...state.selectedIds, id];

      localStore.setItem(LOCAL_SELECTED_CALENDARS_KEY, newSelectedIds);
      return {selectedIds: newSelectedIds};
    });
  },
  setCalendarStatus: (status) => set({calendarStatus: status})
}));
