import {create} from "zustand";

import type {CalendarTypes} from "../types/calendar.types";

type CalendarsStoreType = {
  calendarsArray: CalendarTypes[];
  addNewCalendar: (title: string, color: string) => void;
  editCalendar: (
    id: number,
    update: {checked?: boolean; title?: string; color?: string}
  ) => void;
};

export const useCalendarsListStore = create<CalendarsStoreType>((set) => ({
  calendarsArray: [
    {
      title: "My Calendar",
      value: "My Calendar",
      id: 123123122,
      color: "blue",
      checked: true
    },
    {
      title: "My Calendar1",
      value: "My Calendar1",
      id: 123123123,
      color: "blue",
      checked: true
    }
  ],
  addNewCalendar: (title, color) =>
    set((state) => ({
      calendarsArray: [
        ...state.calendarsArray,
        {
          title,
          value: title,
          id: new Date().getTime(),
          color,
          checked: true
        }
      ]
    })),
  editCalendar: (id, updates) => {
    set((state) => {
      const newArray = state.calendarsArray.map((item) =>
        item.id === id ? {...item, ...updates} : item
      );
      return {calendarsArray: newArray};
    });
  }
}));
