import {useCalendarStore} from "@/features/calendars-filter/model/useCalendarStore";
import {DayColumn} from "../day-column";
import type {DBEvent} from "@/entities/event/event.types";

type Props = {
  weekDayArray: Date[];
  eventList: DBEvent[];
  onEventClickHandler?: (event: DBEvent) => void;
  onEmptyCellClickHandler?: (date: Date) => void;
};

export const CalendarGrid = ({
  weekDayArray,
  eventList,
  onEventClickHandler,
  onEmptyCellClickHandler
}: Props) => {
  const calendarList = useCalendarStore((s) => s.calendars);

  return weekDayArray.map((currentDate) => {
    const eventsByDate = eventList.filter(
      (event) =>
        event.eventDate.day.toDateString() === currentDate.toDateString()
    );

    return (
      <DayColumn
        key={currentDate.toDateString()}
        currentDay={currentDate}
        events={eventsByDate}
        calendars={calendarList}
        onEventClick={onEventClickHandler}
        onEmptyCellClick={onEmptyCellClickHandler}
      />
    );
  });
};
