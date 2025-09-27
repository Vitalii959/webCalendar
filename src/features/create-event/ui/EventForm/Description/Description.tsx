import "./description.css";
import {InputField} from "@/shared/ui/inputField";
import styles from "../iconsLayout.module.css";
import {Icons} from "@/shared/ui/icons";

export type DescriptionProps = {
  value: string;
  onChange: (value: string) => void;
};

export const Description = ({value, onChange}: DescriptionProps) => {
  return (
    <div className='titleRow'>
      <div className={`${styles.icon} p-0.5`}>
        <Icons name='text' />
      </div>
      <div className='titleInputWrapper'>
        <InputField
          title='Description'
          onChange={onChange}
          type='text'
          placeholder='Enter description'
          value={value}
        />
      </div>
    </div>
  );
};
