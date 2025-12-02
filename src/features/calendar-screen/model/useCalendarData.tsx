import {calendarRepository} from "@/entities/calendar/model/repository";
import type {DBEvent} from "@/entities/event/event.types";
import {eventRepository} from "@/entities/event/model/repository";
import {useUserStore} from "@/entities/user/model/useUserStore";
import {selectedCalendarsStore} from "@/features/calendars-filter-panel/model/selectedCalendarsStore";
import {useEffect, useState} from "react";

export const useCalendarData = () => {
  const [events, setEvents] = useState<DBEvent[]>([]);
  const setCalendars = selectedCalendarsStore((s) => s.setCalendars);

  const user = useUserStore((s) => s.user);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = eventRepository.startSubscription(user.uid, setEvents);

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = calendarRepository.subscribeCalendars(
      user.uid,
      setCalendars
    );
    return () => unsubscribe();
  }, [user, setCalendars]);

  return {events};
};
