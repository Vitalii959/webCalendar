import {calendarRepository} from "@/entities/calendar/model/repository";
import {useUserStore} from "@/entities/user/model/useUserStore";

import type {
  CalendarCreate,
  CalendarUpdate
} from "@/entities/calendar/calendar.types";
import {selectedCalendarsStore} from "./selectedCalendarsStore";

export function requireUid(): string {
  const uid = useUserStore.getState().user?.uid;
  if (!uid) throw new Error("User not authenticated");
  return uid;
}
const setCalendarStatus = selectedCalendarsStore.getState().setCalendarStatus;

export const calendarActions = {
  createCalendar: async (data: CalendarCreate) => {
    const ownerId = requireUid();
    if (!ownerId) return;
    try {
      await calendarRepository.createCalendar(ownerId, data);
    } catch (error) {
      console.error("Failed to create calendar", error);
      throw error;
    }
  },
  updateCalendar: async (id: string, data: CalendarUpdate) => {
    const ownerId = requireUid();

    setCalendarStatus("pending");

    try {
      await calendarRepository.updateCalendar(ownerId, id, data);
      setCalendarStatus("success");
    } catch (error) {
      setCalendarStatus("error");
      console.error("Error", error);
      throw error;
    }
  },
  deleteCalendar: async (id: string) => {
    const ownerId = requireUid();
    if (!ownerId) return;

    setCalendarStatus("pending");
    try {
      await calendarRepository.deleteCalendar(id, ownerId);
      setCalendarStatus("success");
    } catch (error) {
      setCalendarStatus("error");
      console.error("Error", error);
      throw error;
    }
  }
};
