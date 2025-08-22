import {
  eachHourOfInterval,
  endOfDay,
  startOfDay,
  eachMinuteOfInterval,
  addMinutes
} from "date-fns";
export const timePicker = (currentDate: Date) => {
  return eachHourOfInterval(
    {
      start: startOfDay(currentDate),
      end: endOfDay(currentDate)
    },
    {step: 1}
  );
};

export const quarters = (hour: Date) => {
  return eachMinuteOfInterval(
    {
      start: hour,
      end: addMinutes(hour, 45)
    },
    {step: 15}
  );
};
