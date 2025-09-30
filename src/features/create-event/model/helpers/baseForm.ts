import {addMinutes, startOfDay} from "date-fns";
import {roundUpToNextQuarter} from "./timeUtils";
import type {EventType} from "@/entities/event/event.types";

export const repeatOptions = [
  {title: "Every Year", value: "Yearly"},
  {title: "Every Month", value: "Monthly"},
  {title: "Every Week", value: "Weekly"}
];

export const baseForm: EventType = {
  eventTitle: "",
  eventDate: {
    day: startOfDay(new Date()),
    startTime: roundUpToNextQuarter(new Date()),
    endTime: addMinutes(roundUpToNextQuarter(new Date()), 15)
  },
  allDayChecked: false,
  repeatRule: "",
  calendarName: "",
  description: ""
};
