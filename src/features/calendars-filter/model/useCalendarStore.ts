import {create} from "zustand";
import type {CalendarTypes} from "@/entities/calendar/calendar.types";
import type {StatusType} from "@/shared/lib/status";

type CalendarStore = {
  calendars: CalendarTypes[];
  selectedIds: string[];
  calendarStatus: StatusType;
  setCalendars: (calendars: CalendarTypes[]) => void;
  toggleSelectedIds: (id: string) => void;
  setCalendarStatus: (status: StatusType) => void;
};

export const useCalendarStore = create<CalendarStore>((set) => ({
  calendars: [],
  selectedIds: [],
  calendarStatus: "idle",
  setCalendars: (calendarsArray) => set({calendars: [...calendarsArray]}),

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
