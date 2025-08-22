type CalendarHeaderProps = {weekArray: Date[]};

import "./CalendarHeader.css";

export const CalendarHeader = ({weekArray}: CalendarHeaderProps) => {
  return (
    <>
      {weekArray.map((item) => (
        <div className='calendarGrid__dayWrapper' key={item.toDateString()}>
          <div className='calendarGrid__dayContainer'>
            <div className='calendarGrid__day'>{item.getDate()}</div>
            <div className='calendarGrid__dayName'>
              {item.toLocaleDateString("en-EN", {weekday: "short"})}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
