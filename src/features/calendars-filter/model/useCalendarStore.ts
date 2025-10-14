import {create} from "zustand";
import type {CalendarTypes} from "@/entities/calendar/calendar.types";
import type {StatusType} from "@/shared/lib/status";
import {useUserStore} from "@/entities/user/model/zustand";

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

export const useCalendarStore = create<CalendarStore>((set) => ({
  calendars: [],
  selectedIds: [],
  calendarStatus: "idle",
  setCalendars: (calendarsArray) => {
    const userName = useUserStore.getState().user?.displayName ?? undefined;
    const defCalendar = defaultCalendar(userName);
    set({calendars: [defCalendar, ...calendarsArray]});
  },

  toggleSelectedIds: (id) => {
    set((state) => {
      const idExist = state.selectedIds.includes(id);
      return {
        selectedIds: idExist
          ? state.selectedIds.filter((x) => x !== id)
          : [...state.selectedIds, id]
      };
    });
  },
  setCalendarStatus: (status) => set({calendarStatus: status})
}));
