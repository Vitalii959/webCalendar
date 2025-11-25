import "./dayColumn.css";
import type {DBEvent} from "@/entities/event/event.types";

import {EventCard} from "@/entities/event/ui/event-card";
import {differenceInMinutes, format} from "date-fns";
import type {CalendarTypes} from "@/entities/calendar";
import {
  quarters,
  timePicker
} from "@/features/calendar-screen/helper/calendarGrin.hendler.";

type Props = {
  currentDay: Date;
  events: DBEvent[];
  calendars: CalendarTypes[];
  onEventClick?: (event: DBEvent) => void;
  onEmptyCellClick?: (date: Date) => void;
};

export const DayColumn = ({
  currentDay,
  events,
  calendars,
  onEventClick,
  onEmptyCellClick
}: Props) => {
  return (
    <>
      <div className='calendarGrid__task-cell calendarTaskCell'>
        {events.map((event) => {
          const eventId = event.calendar.calendarId;
          const calendar = calendars.find(
            (calendar) => calendar.id === eventId
          );

          return (
            <EventCard
              key={event.id}
              title={event.eventTitle}
              time={`${format(event.eventDate.startTime, "p")} - ${format(
                event.eventDate.endTime,
                "p"
              )}`}
              height={differenceInMinutes(
                event.eventDate.endTime,
                event.eventDate.startTime
              )}
              top={differenceInMinutes(
                event.eventDate.startTime,
                event.eventDate.day
              )}
              color={calendar?.color}
              onEventClick={() => onEventClick?.(event)}
            />
          );
        })}

        {timePicker(currentDay).map((hour) => {
          return (
            <div className='hourRow' key={hour.toLocaleTimeString()}>
              <div className=''>
                {quarters(hour).map((quater) => (
                  <div
                    key={quater.toString()}
                    className='quarterCell'
                    onClick={() => onEmptyCellClick?.(quater)}
                  ></div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
