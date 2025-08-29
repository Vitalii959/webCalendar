import "./WebCalendar.css";
import {NavBar} from "@/Widgets/NavBar/ui/NavBar";
import {ModalContainer} from "@/entities/service/ui/modal-container/ModalContainer";
import {Sidebar} from "@/Widgets/Sidebar/ui/Sidebar";
import {CalendarContainer} from "@/Widgets/MainCalendar/ui/calendar-container";
import {useEffect} from "react";
import {useUserStore} from "@/entities/user/model/zustand";
import {useEventStore} from "@/entities/event/model/zustand";
import {ToastContainer} from "@/entities/service/ui/toast-container";
import {useCalendarStore} from "@/entities/calendar/model/zustand";

document.body.setAttribute("data-theme", "light-theme");

export const WebCalendar = () => {
  const {user} = useUserStore();
  const {startSync, stopSync} = useEventStore();
  const {startCalendarListener} = useCalendarStore();
  useEffect(() => {
    if (!user) return;
    startSync(user.uid);
    return () => stopSync();
  }, [user, startSync, stopSync]);

  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = startCalendarListener(user.uid);

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user?.uid, startCalendarListener]);

  return (
    <div className='w-full h-dvh relative'>
      <NavBar />
      <section className='main__page container  '>
        <Sidebar />
        <CalendarContainer />
      </section>
      <ModalContainer />
      <ToastContainer />
    </div>
  );
};
