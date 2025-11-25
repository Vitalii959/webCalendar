import {calendarRepository} from "@/entities/calendar/model/repository";
import type {DBEvent} from "@/entities/event/event.types";
import {eventRepository} from "@/entities/event/model/repository";
import {useUserStore} from "@/entities/user/model/zustand";
import {useCalendarStore} from "@/features/calendars-filter/model/useCalendarStore";
import {useEffect, useState} from "react";

export const useCalendarData = () => {
  const [events, setEvents] = useState<DBEvent[]>([]);
  const setCalendars = useCalendarStore((s) => s.setCalendars);

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
