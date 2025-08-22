import {addMinutes, endOfDay, format, startOfDay} from "date-fns";

type HourRenderProps = (calendarDate: Date) => {title: string; value: string}[];

export const hourRender: HourRenderProps = (calendarDate) => {
  let startTime = calendarDate;

  const hourArray = [];

  while (startTime < endOfDay(calendarDate)) {
    hourArray.push({
      title: format(startTime, "p"),
      value: format(startTime, "Pp")
    });
    startTime = addMinutes(startTime, 15);
  }

  return hourArray;
};
export const roundUpToNextQuarter = (date: Date) => {
  const minutes = date.getMinutes();
  const extra = 15 - (minutes % 15);
  return addMinutes(date, extra === 15 ? 0 : extra);
};

export const setSpecialDate = (date: Date) => {
  return {
    eventDate: {
      day: startOfDay(date),
      startTime: roundUpToNextQuarter(date),
      endTime: addMinutes(roundUpToNextQuarter(date), 30)
    }
  };
};
