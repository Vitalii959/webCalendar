import type {CalendarViewToggle} from "@/features/calendar-view-toggle/model/types";
import "./dropDown.css";

type Props = {
  options: {title: string; value: string}[];
  onOptionChange: (view: CalendarViewToggle) => void;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export function DropDown({options, onOptionChange, ...restProps}: Props) {
  return (
    <>
      {options && (
        <div className='dropdown-menu'>
          <select
            className='dropdown-menu__select'
            onChange={(e) =>
              onOptionChange(e.target.value as CalendarViewToggle)
            }
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
