import {DayColumn} from "../day-column";
import type {DBEvent} from "@/entities/event/model/types/event.types";

type Props = {
  weekArray: Date[];
  events: DBEvent[];
  onEventClick?: (event: DBEvent) => void;
  onEmptyCellClick?: (date: Date) => void;
};

export const CalendarGrid = ({
  weekArray,
  events,
  onEventClick,
  onEmptyCellClick
}: Props) => {
  return weekArray.map((currentDay) => {
    const eventsByDate = events.filter(
      (event) =>
        event.eventDate.day.toDateString() === currentDay.toDateString()
    );

    return (
      <DayColumn
        key={currentDay.toDateString()}
        currentDay={currentDay}
        events={eventsByDate}
        onEventClick={onEventClick}
        onEmptyCellClick={onEmptyCellClick}
      />
    );
  });
};
