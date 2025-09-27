import type {EventType} from "@/entities/event/event.types";

type ValidationResult = {
  valid: boolean;
  errors: {
    title?: string;
    calendarName?: string;
  };
};

export const validateEvent = (draftEvent: EventType): ValidationResult => {
  const errors: ValidationResult["errors"] = {};

  if (!draftEvent.eventTitle.trim()) {
    errors.title = "Title is required";
  }

  if (!draftEvent.calendarName) {
    errors.calendarName = "Calendar is requireUid";
  }
  return {valid: Object.keys(errors).length === 0, errors};
};
