import type {CalendarTypes} from "@/entities/calendar";
import type {FormProps} from "../formProps.types";
import {baseForm} from "./baseForm";
import {setSpecialDate} from "./timeUtils";

export const initialForm = (props: FormProps, calendars: CalendarTypes[]) => {
  const calendarss = {
    calendar: {
      calendarName: calendars[0].title,
      calendarId: calendars[0].id
    }
  };

  const currentDate = new Date();
  if (props.mode === "edit") {
    const form = {...props.defaultValues};
    return form;
  }
  if (props.mode === "create" && props.createOnSpecialDate) {
    const specialDate = setSpecialDate(props.createOnSpecialDate);

    return {
      ...baseForm,
      ...calendarss,
      ...specialDate
    };
  }

  const onCurrentDate = {
    ...baseForm,
    ...calendarss,
    eventDate: {
      ...baseForm.eventDate,
      day: new Date(currentDate),
      startTime: new Date(currentDate),
      endTime: new Date(currentDate)
    }
  };

  return onCurrentDate;
};
