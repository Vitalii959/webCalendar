import {useEffect, useMemo, useRef, useState} from "react";
import {hourRender, roundUpToNextQuarter} from "./helpers";
import {addMinutes, isBefore, startOfDay} from "date-fns";
import type {EventType} from "@/entities/event/event.types";
import {useClickOutside} from "@/shared/hooks";

type Props = {
  eventDate: EventType["eventDate"];
  onDateChange: (DateType: EventType["eventDate"]) => void;
};

export const useDataSelector = ({eventDate, onDateChange}: Props) => {
  const [daySelected, setDaySelected] = useState(startOfDay(eventDate.day));
  const [startTimeSelected, setStartTimeSelected] = useState(
    roundUpToNextQuarter(eventDate.startTime)
  );
  const [endTimeSelected, setEndTimeSelected] = useState(
    roundUpToNextQuarter(eventDate.endTime)
  );

  const [miniCalendarVisibility, setMiniCalendarVisibility] = useState(false);
  const miniCalendarRef = useRef<HTMLDivElement>(null);

  useClickOutside(miniCalendarRef, () => setMiniCalendarVisibility(false));

  const startTimeArray = useMemo(() => {
    return hourRender(daySelected);
  }, [daySelected]);

  const endTimeArray = useMemo(() => {
    const startTime = startTimeSelected;
    const endTime = endTimeSelected;
    const endTimeArr = hourRender(addMinutes(startTimeSelected, 30));

    if (!isBefore(startTime, endTime))
      setEndTimeSelected(new Date(endTimeArr[0].value));

    return endTimeArr;
  }, [startTimeSelected]);

  useEffect(() => {
    const prevStartTime = {
      h: startTimeSelected.getHours(),
      m: startTimeSelected.getMinutes()
    };
    const prevEndTime = {
      h: endTimeSelected.getHours(),
      m: endTimeSelected.getMinutes()
    };
    setStartTimeSelected(
      new Date(
        daySelected.getFullYear(),
        daySelected.getMonth(),
        daySelected.getDate(),
        prevStartTime.h,
        prevStartTime.m
      )
    );
    setEndTimeSelected(
      new Date(
        daySelected.getFullYear(),
        daySelected.getMonth(),
        daySelected.getDate(),
        prevEndTime.h,
        prevEndTime.m
      )
    );
  }, [daySelected]);

  useEffect(() => {
    onDateChange({
      day: daySelected,
      startTime: startTimeSelected,
      endTime: endTimeSelected
    });
  }, [daySelected, startTimeSelected, endTimeSelected]);

  return {
    daySelected,
    setDaySelected,
    startTimeSelected,
    setStartTimeSelected,
    endTimeSelected,
    setEndTimeSelected,
    startTimeArray,
    endTimeArray,
    miniCalendarVisibility,
    setMiniCalendarVisibility,
    miniCalendarRef
  };
};
