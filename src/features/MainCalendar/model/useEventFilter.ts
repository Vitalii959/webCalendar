import {useCalendarStore} from "@/features/calendars-filter/model/useCalendarStore";
import type {DBEvent} from "@/entities/event/event.types";
import {useMemo} from "react";

export const useEventFilter = (events?: DBEvent[]) => {
  const selectedId = useCalendarStore((s) => s.selectedIds);

  const filtered = useMemo(() => {
    let result = events || [];

    if (selectedId && events)
      result = events.filter((event) =>
        selectedId.includes(event.calendar.calendarId)
      );

    return result;
  }, [events, selectedId]);

  return filtered;
};
