import "./dateSelector.css";
import styles from "../iconsLayout.module.css";
import {InputField} from "@/shared/ui/inputField";
import {Select} from "@/shared/ui/select";
import {Calendar} from "@/shared/ui/calendar";
import {Icons} from "@/shared/ui/icons";

import {format} from "date-fns";

import type {EventType} from "@/entities/event/event.types";
import {useDataSelector} from "@/features/create-event/model/useDataSelector";

export type DateSelectorProps = {
  eventDate: EventType["eventDate"];
  onDateChange: (DateType: EventType["eventDate"]) => void;
};

export const DateSelector = ({eventDate, onDateChange}: DateSelectorProps) => {
  const {
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
  } = useDataSelector({
    eventDate,
    onDateChange
  });

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
            value={format(daySelected, "cccc, MMMM d")}
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
              globalDate={daySelected}
              onSelect={(e) => {
                setDaySelected(e);
                setMiniCalendarVisibility(false);
              }}
              className={miniCalendarVisibility ? "block" : "hidden"}
            />
          </div>
        </div>
        <Select
          options={startTimeArray}
          defaultValue={format(startTimeSelected, "Pp")}
          title='Start time'
          onChangeOption={(e) => {
            setStartTimeSelected(new Date(e));
          }}
        />
        {" - "}
        <Select
          defaultValue={format(endTimeSelected, "Pp")}
          options={endTimeArray}
          title={"End time"}
          onChangeOption={(e) => setEndTimeSelected(new Date(e))}
        />
      </div>
    </div>
  );
};
