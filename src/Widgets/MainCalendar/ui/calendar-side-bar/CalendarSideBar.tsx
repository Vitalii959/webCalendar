import {format} from "date-fns";
import "./CalendarSideBar.css";

type CalendarSideBarProps = {hoursArray: Date[]};

export const CalendarSideBar = ({hoursArray}: CalendarSideBarProps) => {
  return (
    <>
      {hoursArray.map((item, index) => (
        <div className='calendarGrid__hour-container' key={index}>
          <div className='calendarGrid__hour'>{format(item, "h b")}</div>
        </div>
      ))}
    </>
  );
};
