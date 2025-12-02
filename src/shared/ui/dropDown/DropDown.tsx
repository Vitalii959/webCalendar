import "./dropDown.css";
import type {calendarGridView} from "@/features/calendar-grid-view/model/calendarGridView.types";

type Props = {
  options: {title: string; value: string}[];
  onOptionChange: (view: calendarGridView) => void;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export function DropDown({options, onOptionChange, ...restProps}: Props) {
  return (
    <>
      {options && (
        <div className='dropdown-menu'>
          <select
            className='dropdown-menu__select'
            onChange={(e) => onOptionChange(e.target.value as calendarGridView)}
            defaultValue={"week"}
            {...restProps}
          >
            {options.map((option, index) => {
              return (
                <option
                  key={index}
                  className='dropdown-menu__option'
                  value={option.value}
                >
                  {option.title}
                </option>
              );
            })}
          </select>
        </div>
      )}
    </>
  );
}
