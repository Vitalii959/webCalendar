import {Icons} from "@/shared/ui/icons";
import {Select} from "@/shared/ui/select";
import styles from "../iconsLayout.module.css";
import type {CalendarTypes} from "@/entities/calendar/calendar.types";

import type {SelectOption} from "@/shared/ui/select/Select";

export type CalendarOptionsProps = {
  calendarsArray: CalendarTypes[];
  defaultValue: string;
  onCalendarSelect: (option: SelectOption) => void;
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
    <div className='flex'>
      <div className={styles.icon}>
        <Icons name='calendar' />
      </div>
      <div className='flex-auto'>
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
