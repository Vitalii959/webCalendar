import type React from "react";
import "./select.css";

export type SelectOption = {
  title: string;
  value: string;
};

export type SelectProps = {
  options: SelectOption[];
  defaultValue: string;
  title?: string;
  onChangeOption: (value: string) => void;
};

export function Select({
  options,
  title,
  defaultValue,
  onChangeOption
}: SelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) onChangeOption(value);
  };
  return (
    <>
      {options && (
        <div className='select'>
          <div className='select__title'>{title}</div>

          <select
            className='select__container'
            onChange={handleChange}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            value={defaultValue}
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
