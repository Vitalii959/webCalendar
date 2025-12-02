import "./titleInput.css";
import {Icons} from "@/shared/ui/icons";
import {InputField} from "@/shared/ui/inputField";
import styles from "../iconsLayout.module.css";

export type TitleInputProps = {
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

export const TitleInput = ({value, error, onChange}: TitleInputProps) => {
  return (
    <div className='title'>
      <div className={styles.icon}>
        <Icons name='text' />
      </div>
      <div className='title__input-container'>
        <InputField
          title='Title'
          onChange={onChange}
          type='text'
          placeholder='Enter title'
          value={value}
          error={error}
        />
      </div>
    </div>
  );
};
