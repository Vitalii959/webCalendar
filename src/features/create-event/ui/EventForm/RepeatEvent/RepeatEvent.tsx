import "./repeatEvent.css";
import {CheckBox} from "@/shared/ui/checkBox";

import {Select} from "@/shared/ui/select";
import styles from "../iconsLayout.module.css";

type RepeatEventProps = {
  checked: boolean;
  setChecked: (value: boolean) => void;
  defaultValue: string;
  onSelect: (value: string) => void;
  options: {title: string; value: string}[];
};

export type HandleClickToggle = (prev: boolean) => void;

export const RepeatEvent = ({
  checked,
  setChecked,
  defaultValue,
  onSelect,
  options
}: RepeatEventProps) => {
  return (
    <div className='flex items-center'>
      {/* style.icon for have same distande for empty div, do not remove */}
      <div className={styles.icon}></div>
      <div className='mr-6' onClick={() => setChecked(!checked)}>
        <CheckBox
          checked={checked}
          title='Repeat'
          name='allname'
          iconColor='green'
        />
      </div>
      {checked && (
        <Select
          options={options}
          defaultValue={defaultValue}
          onChangeOption={(e) => {
            const valueSelected = e.value;
            onSelect(valueSelected);
          }}
        />
      )}
    </div>
  );
};
