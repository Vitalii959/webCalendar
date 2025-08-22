import "./MiniCalendar.css";

import {Calendar} from "@/shared/ui-kit/ui/calendar";

import {useCurrentDateStore} from "@/features/calendar-navigation/model/zustand";

export const MiniCalendar = () => {
  const globalDate = useCurrentDateStore((state) => state.currentDate);
  const setGlobalDate = useCurrentDateStore((state) => state.setCurrentDate);

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
