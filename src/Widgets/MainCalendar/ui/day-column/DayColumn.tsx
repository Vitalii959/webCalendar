import "./dayColumn.css";
import type {DBEvent} from "@/entities/event/model/types/event.types";
import {quarters, timePicker} from "../../helper/calendarGrin.hendler.";
import {EventCard} from "@/entities/event/ui/event-card";
import {differenceInMinutes, format} from "date-fns";

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
  return (
    <>
      <div
        className='calendarGrid__task-cell calendarTaskCell'
        key={currentDay.toDateString()}
      >
        {events.map((event) => {
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
              onEventClick={() => onEventClick?.(event)}
            />
          );
        })}

        {timePicker(currentDay).map((hour, index) => {
          return (
            <div className='hourRow' key={index}>
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
