import "./WebCalendar.css";
import {NavBar} from "@/features/NavBar/ui/NavBar";
import {ModalContainer} from "@/shared/ui/modal";
import {Sidebar} from "@/Widgets/Sidebar/ui/Sidebar";
import {CalendarContainer} from "@/features/MainCalendar/ui/calendar-container";
import {useEffect} from "react";
import {useUserStore} from "@/entities/user/model/zustand";

import {ToastContainer} from "@/shared/ui/toast";
import {calendarRepository} from "@/entities/calendar/model/repository";
import {useCalendarStore} from "@/features/calendars-filter/model/useCalendarStore";

document.body.setAttribute("data-theme", "light-theme");

export const WebCalendar = () => {
  const user = useUserStore((s) => s.user);

  const {setCalendars} = useCalendarStore.getState();

  // feature/move it into custom hook
  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = calendarRepository.subscribeCalendars(
      user.uid,
      setCalendars
    );
    return () => unsubscribe();
  }, [user?.uid, setCalendars]);

  return (
    <>
      <NavBar />
      <section className='main__page container  '>
        <Sidebar />
        <CalendarContainer />
      </section>
      <div className='modal-container'>
        <ModalContainer />
      </div>
      <ToastContainer />
    </>
  );
};
