import type React from "react";
import "./select.css";

export type SelectOption = {
  title: string;
  value: string;
};

export type SelectProps = {
  options: SelectOption[];
  defaultValue?: string;
  title?: string;
  onChangeOption: (option: SelectOption) => void;
};

export function Select({
  options,
  title,
  defaultValue,
  onChangeOption,
  ...restProps
}: SelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const selectedObject = options.find((o) => o.value === value);
    if (selectedObject) onChangeOption(selectedObject);
  };
  return (
    <>
      {options && (
        <div className='select'>
          <div className='select__title'>{title}</div>

          <select
            className='select__container'
            defaultValue={defaultValue}
            onChange={handleChange}
            {...restProps}
          >
            {options.map((item) => (
              <option
                className='select__option'
                key={item.value}
                value={item.value}
                id={item.value}
              >
                {item.title}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
}
