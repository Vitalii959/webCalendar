import "./calendarsList.css";
import {CalendarsFilterForm} from "../CalendarsFilterForm";
import {useModalStore} from "@/entities/service/model/modal-storage-local";
import {Icons} from "@/shared/ui-kit/icons";
import {CalendarItem} from "../CalendarItem";
import {useCalendarStore} from "@/entities/calendar/model/zustand";

export const CalendarsList = () => {
  const {calendars} = useCalendarStore();
  const setModalContent = useModalStore((state) => state.setModalContent);
  const handleOpenModal = () => {
    setModalContent(
      "Create calendar",
      true,
      <CalendarsFilterForm mode='create' />
    );
  };

  return (
    <div className='myCalendar'>
      <div className='myCalendar__header'>
        <h3 className='myCalendar__header-title'>My Calendars</h3>
        <div
          className='myCalendar__header-addNewCalendar'
          onClick={handleOpenModal}
        >
          <Icons name='plus' />
        </div>
      </div>{" "}
      <div className='myCalendar__options'>
        {" "}
        {calendars.map((item) => (
          <CalendarItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
