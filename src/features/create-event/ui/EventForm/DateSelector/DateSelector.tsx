import styles from "../iconsLayout.module.css";
import {InputField} from "@/shared/ui/inputField";
import {Select} from "@/shared/ui/select";
import {Calendar} from "@/shared/ui/calendar";
import {Icons} from "@/shared/ui/icons";

import {format} from "date-fns";

import {useState} from "react";
import type {EventType} from "@/entities/event/model/types";

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

  return (
    <div className='flex'>
      <div className={styles.icon}>
        <Icons name='clock' />
      </div>
      <div className='flex gap-x-5'>
        <div className='flex relative'>
          <InputField
            title='Date'
            type='text'
            value={format(eventDate.day, "cccc, MMMM d")}
            onClick={() => setMiniCalendarVisibility(true)}
          />
          <Calendar
            globalDate={eventDate.day}
            onSelect={(e) => {
              setEventDate({key: "day", value: e});
              setMiniCalendarVisibility(false);
            }}
            className={miniCalendarVisibility ? "block" : "hidden"}
          />
        </div>
        <Select
          value={format(startTimeDefault, "Pp")}
          options={startTimeArray}
          title='Start time'
          onSelect={(e) => {
            setEventDate({key: "startTime", value: new Date(e)});
          }}
        />
        {" - "}
        <Select
          options={endTimeArray}
          title={"End time"}
          onSelect={(e) => setEventDate({key: "endTime", value: new Date(e)})}
        />
      </div>
    </div>
  );
};
