import "./calendarsList.css";
import {CalendarsFilterForm} from "../CalendarsFilterForm";
import {useModalStore} from "@/shared/lib/modal-storage";
import {Icons} from "@/shared/ui/icons";
import {CalendarItem} from "../CalendarItem";
import {selectedCalendarsStore} from "@/features/calendars-filter-panel/model/selectedCalendarsStore";

export const CalendarsList = () => {
  const calendars = selectedCalendarsStore((s) => s.calendars);
  const setModalContent = useModalStore((s) => s.setModalContent);
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
        {/* <CalendarItem item={defaultCalendar} /> */}
        {calendars.map((item) => (
          <CalendarItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
