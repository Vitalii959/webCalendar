import {currentDateStore} from "@/features/calendar-date-controls/model";
import "./MiniCalendar.css";

import {Calendar} from "@/shared/ui/calendar";

export const MiniCalendar = () => {
  const globalDate = currentDateStore((state) => state.currentDate);
  const setGlobalDate = currentDateStore((state) => state.setCurrentDate);

  return (
    <div className='mini-calendar'>
      <Calendar
        globalDate={globalDate}
        onSelect={(date) => {
          setGlobalDate(date);
        }}
      />
    </div>
  );
};
