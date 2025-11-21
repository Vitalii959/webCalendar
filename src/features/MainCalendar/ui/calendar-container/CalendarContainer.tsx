import "./CalendarContainer.css";

import {CalendarHeader} from "../calendar-header";
import {CalendarSideBar} from "../calendar-side-bar";
import {CalendarGrid} from "../calendar-grid";

import {useEffect, useState} from "react";

import {useCalendarLogic} from "../../model/useCalendarLogic";
import {eventRepository} from "@/entities/event/model/repository";
import {useUserStore} from "@/entities/user/model/zustand";
import {useEventFilter} from "../../model/useEventFilter";
import type {DBEvent} from "@/entities/event/event.types";

export const CalendarContainer = () => {
  const {onEmptyCellClick, onEventClick, weekDayArray} = useCalendarLogic();

  const [events, setEvents] = useState<DBEvent[]>([]);

  const user = useUserStore((s) => s.user);

  const filteredEvents = useEventFilter(events);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = eventRepository.startSubscription(user.uid, setEvents);

    return () => unsubscribe();
  }, [user]);

  return (
    <div className='calendar-grid'>
      <div className='calendarGrid__scrollWrapper'>
        <div className='calendarGrid__container'>
          <div className='calendarGrid__header'>
            <div className='calendarGrid__header-days'>
              <div className='empty-slot' />
              <CalendarHeader weekDayArray={weekDayArray} />
            </div>
          </div>
          <div className='calendarGrid__main'>
            <div className='calendarGrid__main-container'>
              <div className='calendarGrid__hours-sidePanel'>
                <CalendarSideBar />
              </div>
              <CalendarGrid
                weekDayArray={weekDayArray}
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
