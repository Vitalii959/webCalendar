import {Icons} from "@/shared/ui-kit/icons";
import {Select} from "@/shared/ui-kit/ui/select";
import styles from "../iconsLayout.module.css";

export type CalendarOptionsProps = {
  calendarsArray: {title: string; value: string}[];
  defaultValue: string;
  onSelect: (value: string) => void;
};

export const CalendarOptions = ({
  calendarsArray,
  defaultValue,
  onSelect
}: CalendarOptionsProps) => {
  return (
    <div className='flex'>
      <div className={styles.icon}>
        <Icons name='calendar' />
      </div>
      <div className='flex-auto'>
        <Select
          options={calendarsArray}
          title='Calendar'
          defaultValue={defaultValue}
          onSelect={onSelect}
        ></Select>
      </div>
    </div>
  );
};
