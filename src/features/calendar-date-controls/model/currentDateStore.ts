import {create} from "zustand";

export type CalendarProps = {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
};

export const currentDateStore = create<CalendarProps>((set) => ({
  currentDate: new Date(),
  setCurrentDate: (date) => set({currentDate: date})
}));
