import "./eventForm.css";
import {useMemo, useState} from "react";
import {DateSelector} from "./DateSelector";
import {TitleInput} from "./TitleInput";
import {RepeatEvent} from "./RepeatEvent";
import {CalendarOptions} from "./CalendarOptions";
import {Description} from "./Description";
import {Button} from "@/shared/ui/Button";

import {hourRender, setSpecialDate} from "../../model/helpers";
import {addMinutes} from "date-fns";
import {useModalStore} from "@/shared/lib/modal-storage";
import {useNavigate} from "react-router";

import {useEventStore} from "@/entities/event/model/zustand";
import {baseForm, repeatOptions} from "../../model/helpers";

import type {EventType} from "@/entities/event/model/types";
import {useCalendarStore} from "@/features/calendars-filter/model/useCalendarStore";

type CreateMode = {
  mode: "create";
  defaultValues?: never;
  createOnSpecialDate?: Date;
};
type EditMode = {
  mode: "edit";
  defaultValues: EventType;
  id: string;
};

type EventFormProps = CreateMode | EditMode;

export const EventForm = (props: EventFormProps) => {
  const initialForm = () => {
    const editMode = props.mode === "edit";
    const createMode = props.mode === "create";

    if (editMode) {
      const form = {...baseForm, ...props.defaultValues};
      return form;
    }
    if (createMode && props.createOnSpecialDate) {
      const specialDate = setSpecialDate(props.createOnSpecialDate);

      return {...baseForm, ...specialDate};
    }
    return baseForm;
  };

  const navigate = useNavigate();
  const {closeModal} = useModalStore.getState();
  const calendars = useCalendarStore((s) => s.calendars);
  const {addEvent, editEvent} = useEventStore.getState();

  const [form, setForm] = useState(() => initialForm());

  const startTimeArray = useMemo(() => {
    return hourRender(form.eventDate.day);
  }, [form.eventDate.day]);

  const endTimeArray = useMemo(() => {
    return hourRender(addMinutes(form.eventDate.startTime, 15));
  }, [form.eventDate.startTime]);

  const handleSave = () => {
    try {
      if (props.mode === "create") addEvent(form);
      if (props.mode === "edit") {
        editEvent(form, props.id);
      }
      closeModal();
    } catch (err) {
      if (err instanceof Error && err.message === "Not authorized") {
        navigate("/auth");
        return console.error("error", err);
      }
    }
  };
  const updateFormField = <K extends keyof EventType>(
    key: K,
    value: EventType[K]
  ) => {
    setForm((prev) => ({...prev, [key]: value}));
  };

  return (
    <div className='event__wrapper'>
      <TitleInput
        value={form.eventTitle}
        onChange={(e) => updateFormField("eventTitle", e)}
      />
      <DateSelector
        eventDate={form.eventDate}
        setEventDate={({key, value}) =>
          setForm((prev) => ({
            ...prev,
            eventDate: {
              ...prev.eventDate,
              [key]: value
            }
          }))
        }
        startTimeArray={startTimeArray}
        endTimeArray={endTimeArray}
        startTimeDefault={form.eventDate.startTime}
      />
      <RepeatEvent
        checked={form.allDayChecked}
        setChecked={(e) => updateFormField("allDayChecked", e)}
        defaultValue={form.repeatRule}
        options={repeatOptions}
        onSelect={(e) => updateFormField("repeatRule", e)}
      />

      <CalendarOptions
        calendarsArray={calendars}
        defaultValue={form.calendarName} //need to add defaultCalendar
        onSelect={(e) => updateFormField("calendarName", e)}
      />
      <Description
        value={form.description}
        onChange={(e) => updateFormField("description", e)}
      />

      <div className='w-30 h-10 self-end'>
        <Button options='primary' onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};
