import "./dayColumn.css";
import type {DBEvent} from "@/entities/event/event.types";
import {quarters, timePicker} from "../../helper/calendarGrin.hendler.";
import {EventCard} from "@/entities/event/ui/event-card";
import {differenceInMinutes, format} from "date-fns";
import {useCalendarStore} from "@/features/calendars-filter/model/useCalendarStore";

type Props = {
  currentDay: Date;
  events: DBEvent[];
  onEventClick?: (event: DBEvent) => void;
  onEmptyCellClick?: (date: Date) => void;
};

export const DayColumn = ({
  currentDay,
  events,
  onEventClick,
  onEmptyCellClick
}: Props) => {
  const calendars = useCalendarStore((state) => state.calendars);
  const selectedId = useCalendarStore((state) => state.selectedIds);

  return (
    <>
      <div className='calendarGrid__task-cell calendarTaskCell'>
        {events.map((event) => {
          const getCalendarById = calendars.find(
            (cal) => cal.id === event.calendar.calendarId
          );

          const isVisible = selectedId.includes(event.calendar.calendarId);

          return (
            isVisible && (
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
                color={getCalendarById?.color}
                onEventClick={() => onEventClick?.(event)}
              />
            )
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
