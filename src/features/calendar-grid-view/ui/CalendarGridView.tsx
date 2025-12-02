import "./calendarGridView.css";

import {DropDown} from "@/shared/ui/dropDown";
import {useLocation, useNavigate} from "react-router";

const calendarGridOptions = [
  {title: "Day", value: "day"},
  {title: "Week", value: "week"}
];

export const CalendarGridView = () => {
  const navigate = useNavigate();

  const {pathname} = useLocation();
  const currentView = pathname.endsWith("day") ? "day" : "week";

  const setCalendarView = (view: string) => {
    navigate(`/calendar/${view}`);
  };

  return (
    <DropDown
      defaultValue={currentView}
      options={calendarGridOptions}
      onOptionChange={(e) => setCalendarView(e)}
      style={{padding: ".2rem 1.4rem .2rem .8rem", borderRadius: ".6rem"}}
    />
  );
};
