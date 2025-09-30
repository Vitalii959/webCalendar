import "./WebCalendar.css";
import {NavBar} from "@/Widgets/NavBar/ui/NavBar";
import {ModalContainer} from "@/shared/ui/modal";
import {Sidebar} from "@/Widgets/Sidebar/ui/Sidebar";
import {CalendarContainer} from "@/Widgets/MainCalendar/ui/calendar-container";
import {useEffect} from "react";
import {useUserStore} from "@/entities/user/model/zustand";
import {useEventStore} from "@/features/create-event/model";
import {ToastContainer} from "@/shared/ui/toast";
import {calendarRepository} from "@/entities/calendar/model/repository";
import {useCalendarStore} from "@/features/calendars-filter/model/useCalendarStore";
import {eventRepository} from "@/entities/event/model/repository";

document.body.setAttribute("data-theme", "light-theme");

export const WebCalendar = () => {
  const user = useUserStore((s) => s.user);

  const {setCalendars} = useCalendarStore.getState();
  const setEvents = useEventStore.getState().setEvents;

  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = eventRepository.startSubscription(user?.uid, setEvents);

    return () => unsubscribe();
  }, [user?.uid, setEvents]);

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
