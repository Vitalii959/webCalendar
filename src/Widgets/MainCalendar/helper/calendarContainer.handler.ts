import {startOfWeek, addDays, eachDayOfInterval} from "date-fns";

export const createWeekArray = (date: Date): Date[] => {
  const weekStart = startOfWeek(date);
  const weekEnd = addDays(weekStart, 6);
  const weekArray = eachDayOfInterval({
    start: weekStart,
    end: weekEnd
  });
  return weekArray;
};
