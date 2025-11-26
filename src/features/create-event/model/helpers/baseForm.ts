import type {EventType} from "@/entities/event/event.types";

export const repeatOptions = [
  {title: "Every Year", value: "Yearly"},
  {title: "Every Month", value: "Monthly"},
  {title: "Every Week", value: "Weekly"}
];

export const baseForm: EventType = {
  eventTitle: "",
  eventDate: {
    day: new Date(),
    startTime: new Date(),
    endTime: new Date()
  },
  allDayChecked: false,
  repeatRule: "",
  calendar: {calendarName: "", calendarId: ""},
  description: ""
};
