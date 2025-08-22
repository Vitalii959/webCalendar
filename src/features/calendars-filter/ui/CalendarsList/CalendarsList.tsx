import "./calendarsList.css";
import {useCalendarsListStore} from "@/features/calendars-filter/model/zustand";
import {CalendarsFilterForm} from "../CalendarsFilterForm";
import {useModalStore} from "@/entities/service/model/modal-storage.local";
import {Icons} from "@/shared/ui-kit/icons";
import {CalendarItem} from "../CalendarItem";

export const CalendarsList = () => {
  const calendarsArray = useCalendarsListStore((state) => state.calendarsArray);
  const setModalContent = useModalStore((state) => state.setModalContent);
  const handleOpenModal = () => {
    setModalContent("Create calendar", true, <CalendarsFilterForm />);
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
        {calendarsArray.map((item) => (
          <CalendarItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
