import styles from "../iconsLayout.module.css";
import {InputField} from "@/shared/ui/inputField";
import {Select} from "@/shared/ui/select";
import {Calendar} from "@/shared/ui/calendar";
import {Icons} from "@/shared/ui/icons";
import "./dateSelector.css";

import {format} from "date-fns";

import {useEffect, useRef, useState} from "react";
import type {EventType} from "@/entities/event/event.types";

type SetEventDate = (args: {
  key: keyof EventType["eventDate"];
  value: Date;
}) => void;

export type DateSelectorProps = {
  eventDate: EventType["eventDate"];
  setEventDate: SetEventDate;
  startTimeArray: {title: string; value: string}[];
  endTimeArray: {title: string; value: string}[];
  startTimeDefault: Date;
};

export const DateSelector = ({
  eventDate,
  setEventDate,
  startTimeArray,
  endTimeArray,
  startTimeDefault
}: DateSelectorProps) => {
  const [miniCalendarVisibility, setMiniCalendarVisibility] = useState(false);
  const miniCalendarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (!miniCalendarRef.current?.contains(e.target as Node)) {
      setMiniCalendarVisibility(false);
    }
  };

  useEffect(() => {
    if (miniCalendarVisibility === true)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [miniCalendarVisibility]);

  return (
    <div className='dateSelector'>
      <div className={styles.icon}>
        <Icons name='clock' />
      </div>
      <div className='dateSelector__console'>
        <div className='dateSelector__console-input'>
          <InputField
            title='Date'
            type='text'
            value={format(eventDate.day, "cccc, MMMM d")}
            onClick={() => setMiniCalendarVisibility(true)}
          />
          <div
            className='mini-calendar__wrapper'
            style={
              miniCalendarVisibility ? {display: "block"} : {display: "none"}
            }
            ref={miniCalendarRef}
          >
            <Calendar
              globalDate={eventDate.day}
              onSelect={(e) => {
                setEventDate({key: "day", value: e});
                setMiniCalendarVisibility(false);
              }}
              className={miniCalendarVisibility ? "block" : "hidden"}
            />
          </div>
        </div>
        <Select
          defaultValue={format(startTimeDefault, "Pp")}
          options={startTimeArray}
          title='Start time'
          onChangeOption={(opt: {title: string; value: string}) => {
            const valueSelected = opt.value;
            setEventDate({key: "startTime", value: new Date(valueSelected)});
          }}
        />
        {" - "}
        <Select
          options={endTimeArray}
          title={"End time"}
          onChangeOption={(e) => {
            const valueSelected = e.value;
            setEventDate({key: "endTime", value: new Date(valueSelected)});
          }}
        />
      </div>
    </div>
  );
};
