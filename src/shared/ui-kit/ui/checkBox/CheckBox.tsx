import "./checkBox.css";
import {Icons} from "@/shared/ui-kit/icons";

type checkBoxType = {
  title?: string;
  iconColor?: string;
  checked: boolean;
  name: string;
};

export function CheckBox({
  title,
  iconColor,
  checked,
  name,
  ...restProps
}: checkBoxType) {
  return (
    <div className='checkbox'>
      <label className='checkbox-label' htmlFor={name}>
        <input
          className='checkbox-input'
          type='checkbox'
          defaultChecked={checked}
          name={name}
          {...restProps}
        />
        <span className='checkbox-checkmark'>
          <Icons
            name={checked ? "checkbox_checked" : "checkbox"}
            color={iconColor}
          />
        </span>
        {title && <p className='checkbox-title'>{title}</p>}
      </label>
    </div>
  );
}
