import "./weekDayView.css";

import {CalendarHeader} from "./calendar-header";
import {CalendarSideBar} from "./calendar-side-bar";
import {CalendarGrid} from "./calendar-grid";
import {useOutletContext} from "react-router";
import type {DBEvent} from "@/entities/event/event.types";
import {currentDateStore} from "@/features/calendar-date-controls/model";

type CalendarContext = {
  weekDayArray: Date[];
  filteredEvents: DBEvent[];
  onEventClick: (event: DBEvent) => void;
  onEmptyCellClick: (date: Date) => void;
};

export const WeekDayView = ({mode}: {mode: "week" | "day"}) => {
  const currentDate = currentDateStore((s) => s.currentDate);
  const {weekDayArray, filteredEvents, onEventClick, onEmptyCellClick} =
    useOutletContext<CalendarContext>();

  const isWeek = mode === "week";

  const weekDay = isWeek ? weekDayArray : [currentDate];
  const gridClass = isWeek ? "week-view" : "day-view";

  return (
    <div className='calendar-grid'>
      <div className='calendarGrid__scrollWrapper'>
        <div className='calendarGrid__container'>
          <div className='calendarGrid__header'>
            <div className={`${gridClass} calendarGrid__header-days`}>
              <div className='empty-slot' />
              <CalendarHeader weekDayArray={weekDay} />
            </div>
          </div>
          <div className='calendarGrid__main'>
            <div className={`${gridClass} calendarGrid__main-container`}>
              <div className='calendarGrid__hours-sidePanel'>
                <CalendarSideBar />
              </div>
              <CalendarGrid
                weekDayArray={weekDay}
                eventList={filteredEvents}
                onEventClickHandler={onEventClick}
                onEmptyCellClickHandler={onEmptyCellClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
