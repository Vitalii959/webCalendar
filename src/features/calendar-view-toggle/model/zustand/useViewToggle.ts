import {create} from "zustand";

import type {CalendarViewToggle} from "@/features/calendar-view-toggle/model/types";

export type CalendarProps = {
  calendarView: CalendarViewToggle;
  setCalendarView: (view: CalendarViewToggle) => void;
};

export const useViewToggle = create<CalendarProps>((set) => ({
  calendarView: "week",
  setCalendarView: (view) => set({calendarView: view})
}));
