import "./titleInput.css";
import {Icons} from "@/shared/ui-kit/icons";
import {InputField} from "@/shared/ui-kit/ui/inputField";
import styles from "../iconsLayout.module.css";

export type TitleInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export const TitleInput = ({value, onChange}: TitleInputProps) => {
  return (
    <div className='flex'>
      <div className={styles.icon}>
        <Icons name='text' />
      </div>
      <div className='flex-1'>
        <InputField
          title='Title'
          onChange={onChange}
          type='text'
          placeholder='Enter title'
          value={value}
        />
      </div>
    </div>
  );
};
