import "./sidebar.css";
import {CreateEventBtn} from "@/features/create-event/ui/CreateEventBtn";
import {MiniCalendar} from "@/shared/ui-kit/ui/MiniCalendar";
import {CalendarsList} from "@/features/calendars-filter/ui/CalendarsList";

export const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <CreateEventBtn />
      <MiniCalendar />
      <CalendarsList />
    </aside>
  );
};
