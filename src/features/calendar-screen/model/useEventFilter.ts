import {selectedCalendarsStore} from "@/features/calendars-filter-panel/model/selectedCalendarsStore";
import type {DBEvent} from "@/entities/event/event.types";
import {useMemo} from "react";

export const useEventFilter = (events?: DBEvent[]) => {
  const selectedId = selectedCalendarsStore((s) => s.selectedIds);

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
