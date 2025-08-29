import {Icons} from "@/shared/ui-kit/icons";
import {Select} from "@/shared/ui-kit/ui/select";
import styles from "../iconsLayout.module.css";
import type {CalendarTypes} from "@/features/calendars-filter/model/types";

export type CalendarOptionsProps = {
  calendarsArray: CalendarTypes[];
  defaultValue: string;
  onSelect: (value: string) => void;
};

export const CalendarOptions = ({
  calendarsArray,
  defaultValue,
  onSelect
}: CalendarOptionsProps) => {
  const convertToSelectOptions = (calendars: CalendarTypes[]) => {
    return calendars.map((calendar) => ({
      value: calendar.title,
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
          onSelect={onSelect}
        ></Select>
      </div>
    </div>
  );
};
