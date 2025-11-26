import "./calendarOptions.css";
import {Icons} from "@/shared/ui/icons";
import {Select} from "@/shared/ui/select";
import styles from "../iconsLayout.module.css";
import type {CalendarTypes} from "@/entities/calendar/calendar.types";

export type CalendarOptionsProps = {
  calendarsArray: CalendarTypes[];
  defaultValue: string;
  onCalendarSelect: (value: string) => void;
};

export const CalendarOptions = ({
  calendarsArray,
  defaultValue,
  onCalendarSelect: onCalendarSelect
}: CalendarOptionsProps) => {
  const convertToSelectOptions = (calendars: CalendarTypes[]) => {
    return calendars.map((calendar) => ({
      value: calendar.id,
      title: calendar.title
    }));
  };
  return (
    <div className='calendarOptions'>
      <div className={styles.icon}>
        <Icons name='calendar' />
      </div>
      <div className='calendarOptions__field'>
        <Select
          options={convertToSelectOptions(calendarsArray)}
          title='Calendar'
          defaultValue={defaultValue}
          onChangeOption={onCalendarSelect}
        ></Select>
      </div>
    </div>
  );
};
