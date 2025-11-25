import "./webCalendarLayout.css";
import {NavBar} from "@/features/NavBar/ui/NavBar";
import {ModalContainer} from "@/shared/ui/modal";
import {Sidebar} from "@/Widgets/Sidebar/ui/Sidebar";

import {ToastContainer} from "@/shared/ui/toast";
import {Outlet} from "react-router";
import {useCalendarLogic} from "@/features/MainCalendar/model/useCalendarLogic";
import {useEventFilter} from "@/features/MainCalendar/model/useEventFilter";
import {useCalendarData} from "@/features/MainCalendar/model/useCalendarData";

document.body.setAttribute("data-theme", "light-theme");

export const WebCalendarLayout = () => {
  const {onEmptyCellClick, onEventClick, weekDayArray} = useCalendarLogic();

  const {events} = useCalendarData();
  const filteredEvents = useEventFilter(events);

  return (
    <>
      <NavBar />
      <section className='main__page container  '>
        <Sidebar />
        <Outlet
          context={{
            onEmptyCellClick,
            onEventClick,
            weekDayArray,
            filteredEvents
          }}
        />
      </section>
      <div className='modal-container'>
        <ModalContainer />
      </div>
      <ToastContainer />
    </>
  );
};
