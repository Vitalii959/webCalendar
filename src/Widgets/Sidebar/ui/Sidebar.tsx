import "./sidebar.css";
import {CreateEventBtn} from "@/features/create-event/ui/create-event-btn";
import {MiniCalendar} from "@/features/calendar-date-controls/ui/mini-calendar";
import {CalendarsList} from "@/features/calendars-filter-panel/ui/CalendarsList";

export const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <CreateEventBtn />
      <MiniCalendar />
      <CalendarsList />
    </aside>
  );
};
