import "./webCalendarLayout.css";
import {NavHeader} from "@/Widgets/nav-header/ui/NavHeader";
import {ModalContainer} from "@/shared/ui/modal";
import {Sidebar} from "../../../Widgets/Sidebar/ui/Sidebar";
import {ToastContainer} from "@/shared/ui/toast";
import {Outlet} from "react-router";
import {useCalendarLogic} from "@/features/calendar-screen/model/useCalendarLogic";
import {useEventFilter} from "@/features/calendar-screen/model/useEventFilter";
import {useCalendarData} from "@/features/calendar-screen/model/useCalendarData";
import {useModalStore} from "@/shared/lib/modal-storage";
import {useToastStore} from "../../../shared/lib/toast-storage/useToastStore";

document.body.setAttribute("data-theme", "light-theme");

export const WebCalendarLayout = () => {
  const {onEmptyCellClick, onEventClick, weekDayArray} = useCalendarLogic();

  const {events} = useCalendarData();
  const filteredEvents = useEventFilter(events);

  const isOpen = useModalStore((s) => s.isOpen);
  const isOpenToast = useToastStore((s) => s.showToast);

  return (
    <>
      <NavHeader />
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
      {isOpen && (
        <div className='modal-container'>
          <ModalContainer />
        </div>
      )}
      {isOpenToast && <ToastContainer />}
    </>
  );
};
