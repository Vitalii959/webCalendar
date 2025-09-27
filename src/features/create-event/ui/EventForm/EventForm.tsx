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

import {baseForm, repeatOptions} from "../../model/helpers";

import type {EventType} from "@/entities/event/event.types";
import {useCalendarStore} from "@/features/calendars-filter/model/useCalendarStore";
import {eventActions} from "../../model/actions";
import {useUserStore} from "@/entities/user/model/zustand";
import {validateEvent} from "../../model/helpers/validateEvent";

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

type FormErrors = {title?: string; calendarName?: string};

export const EventForm = (props: EventFormProps) => {
  const initialForm = () => {
    if (props.mode === "edit") {
      const form = {...baseForm, ...props.defaultValues};
      return form;
    }
    if (props.mode === "create" && props.createOnSpecialDate) {
      const specialDate = setSpecialDate(props.createOnSpecialDate);

      return {...baseForm, ...specialDate};
    }
    return baseForm;
  };
  const navigate = useNavigate();

  const calendars = useCalendarStore((s) => s.calendars);

  const [errors, setErrors] = useState<FormErrors>();

  const [draftEvent, setDraftEvent] = useState<EventType>(() => initialForm());

  const startTimeArray = useMemo(() => {
    return hourRender(draftEvent.eventDate.day);
  }, [draftEvent.eventDate.day]);

  const endTimeArray = useMemo(() => {
    return hourRender(addMinutes(draftEvent.eventDate.startTime, 15));
  }, [draftEvent.eventDate.startTime]);

  const handleSave = async () => {
    const user = useUserStore.getState().user?.uid;
    if (!user) return navigate("/auth");

    const {valid, errors} = validateEvent(draftEvent);
    if (!valid) {
      setErrors(errors);
      return;
    }

    try {
      if (props.mode === "create") await eventActions.addEvent(draftEvent);
      if (props.mode === "edit")
        await eventActions.editEvent(draftEvent, props.id);

      useModalStore.getState().closeModal();
    } catch (err) {
      if (err instanceof Error && err.message === "Not authorized") {
        navigate("/auth");
        console.error("error", err);
      }
    }
  };
  const updateFormField = <K extends keyof EventType>(
    key: K,
    value: EventType[K]
  ) => {
    setDraftEvent((prev) => ({...prev, [key]: value}));
  };

  return (
    <div className='event__wrapper'>
      <TitleInput
        value={draftEvent.eventTitle}
        onChange={(e) => updateFormField("eventTitle", e)}
        error={errors?.title}
      />
      <DateSelector
        eventDate={draftEvent.eventDate}
        setEventDate={({key, value}) =>
          setDraftEvent((prev) => ({
            ...prev,
            eventDate: {
              ...prev.eventDate,
              [key]: value
            }
          }))
        }
        startTimeArray={startTimeArray}
        endTimeArray={endTimeArray}
        startTimeDefault={draftEvent.eventDate.startTime}
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
        defaultValue={draftEvent.calendarName} //need to add defaultCalendar
        onSelect={(e) => updateFormField("calendarName", e)}
      />
      <Description
        value={draftEvent.description}
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
