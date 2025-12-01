import "./eventForm.css";
import {DateSelector} from "./date-selector";
import {TitleInput} from "./title-input";
import {RepeatEvent} from "./repeat-event";
import {CalendarOptions} from "./calendar-options";
import {Description} from "./description";
import {Button} from "@/shared/ui/Button";
import {repeatOptions} from "../../model/helpers";
import {useEventForm} from "../../model/useEventStore";
import type {FormProps} from "../../model/formProps.types";

export const EventForm = (props: FormProps) => {
  const {
    draftEvent,
    setDraftEvent,
    updateFormField,
    errors,
    handleSave,
    calendars
  } = useEventForm(props);
  console.log(draftEvent);

  return (
    <div className='event__wrapper'>
      <TitleInput
        value={draftEvent.eventTitle}
        onChange={(e) => updateFormField("eventTitle", e)}
        error={errors?.title}
      />
      <DateSelector
        eventDate={draftEvent.eventDate}
        onDateChange={(e) => updateFormField("eventDate", e)}
      />
      <RepeatEvent
        checked={draftEvent.allDayChecked}
        setChecked={(e) => updateFormField("allDayChecked", e)}
        defaultValue={draftEvent.repeatRule}
        options={repeatOptions}
        onSelect={(e) => updateFormField("repeatRule", e)}
      />

      <CalendarOptions
        calendarsArray={calendars}
        defaultValue={draftEvent.calendar.calendarName}
        onCalendarSelect={(e) =>
          setDraftEvent((prev) => ({
            ...prev,
            calendar: {
              ...prev.calendar,
              calendarName: e,
              calendarId: e
            }
          }))
        }
      />
      <Description
        value={draftEvent.description}
        onChange={(e) => updateFormField("description", e)}
      />

      <div className='eventForm__button'>
        <Button options='primary' onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};
