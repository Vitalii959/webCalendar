import "./calendarNavigation.css";
import {Icons} from "@/shared/ui-kit/icons";
import {useCurrentDateStore} from "@/features/calendar-navigation/model/zustand";
import {format, addWeeks} from "date-fns";
import {Button} from "@/shared/ui-kit/ui/Button";

export const CalendarNavigation = () => {
  const {currentDate} = useCurrentDateStore();
  const {setCurrentDate} = useCurrentDateStore();

  return (
    <div className='calendar__navigation'>
      <div className='calendar__navigation-today-btn'>
        <Button options='primary' onClick={() => setCurrentDate(new Date())}>
          Today
        </Button>
      </div>
      <div className='calendar__navigation__btn-wrapper'>
        <div className='calendar__navigation-prevBtn'>
          <Button
            options='secondary'
            onClick={() => setCurrentDate(addWeeks(currentDate, -1))}
          >
            {<Icons name='arrowLeft' />}
          </Button>
        </div>
        <div className='calendar__navigation-nextBtn'>
          <Button
            options='secondary'
            onClick={() => setCurrentDate(addWeeks(currentDate, +1))}
          >
            {<Icons name='arrowRight' />}
          </Button>
        </div>
        <div className='calendar__navigation-currentMonthDisplay'>
          {format(currentDate, "MMMM y")}
        </div>
      </div>
    </div>
  );
};
