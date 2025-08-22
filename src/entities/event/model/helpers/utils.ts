import {differenceInMinutes} from "date-fns";

export const calculateEventHeight = (endTime: Date, startTime: Date) => {
  const result = differenceInMinutes(endTime, startTime);

  return result;
};
export const calculateTopPosition = (endTime: Date, startTime: Date) => {
  const result = differenceInMinutes(startTime, endTime);

  return result;
};
