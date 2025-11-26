import type {EventType} from "@/entities/event/event.types";

import {useState} from "react";
// import {hourRender} from "./helpers";
import {selectedCalendarsStore} from "@/features/calendars-filter-panel/model/selectedCalendarsStore";
import {eventActions} from "./actions";
import {useModalStore} from "@/shared/lib/modal-storage";
import {validateEvent} from "./helpers/validateEvent";
// import {addMinutes} from "date-fns";

import type {FormProps} from "./formProps.types";
import {initialForm} from "./helpers/initialForm";

type FormErrors = {title?: string; calendarName?: string};

export const useEventForm = (props: FormProps) => {
  const calendars = selectedCalendarsStore((s) => s.calendars);
  const closeModal = useModalStore((s) => s.closeModal);

  const [draftEvent, setDraftEvent] = useState<EventType>(() =>
    initialForm(props, calendars)
  );

  const [errors, setErrors] = useState<FormErrors>();

  const updateFormField = <K extends keyof EventType>(
    key: K,
    value: EventType[K]
  ) => {
    setDraftEvent((prev) => ({...prev, [key]: value}));
  };
  const handleSave = async () => {
    const {valid, errors} = validateEvent(draftEvent);

    if (!valid) {
      setErrors(errors);
      return;
    }

    try {
      if (props.mode === "create") await eventActions.addEvent(draftEvent);
      if (props.mode === "edit") {
        await eventActions.editEvent(draftEvent, props.id);
      }

      closeModal();
    } catch (err) {
      console.error("error", err);
    }
  };
  return {
    draftEvent,
    setDraftEvent,
    // startTimeArray,
    // endTimeArray,
    errors,
    setErrors,
    handleSave,
    updateFormField,
    closeModal,
    calendars
  };
};
