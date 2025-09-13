import "./eventInfoModalForm.css";
import {Icons} from "@/shared/ui/icons";
import {format} from "date-fns";
import type {EventType} from "@/entities/event/model/types";

type Props = {
  defaultValues: EventType;
};

export const EventInfoModalForm = ({defaultValues}: Props) => {
  return (
    <div className='event-grid'>
      <div>
        <Icons name='text' />
      </div>
      <div className='event-title'>{defaultValues.eventTitle}</div>

      <div>
        <Icons name='clock' />
      </div>
      <div className='event-date'>
        {format(new Date(defaultValues.eventDate.day), "cccc, LLLL d")}
        {" - "}
        {format(new Date(defaultValues.eventDate.startTime), "p")}
        {" - "}
        {format(new Date(defaultValues.eventDate.endTime), "p")}
        <br />
        {defaultValues.allDayChecked && "All Day , "}{" "}
        {defaultValues.repeatRule && defaultValues.repeatRule}
      </div>

      <div>
        <Icons name='calendar' />
      </div>
      <div className='event-calendar'>{defaultValues.calendarName}</div>

      <div>
        <Icons name='description' />
      </div>
      <div className='event-description'>{defaultValues.description}</div>
    </div>
  );
};
