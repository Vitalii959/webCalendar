import "./calendarVievToggle.css";

import {DropDown} from "@/shared/ui-kit/ui/dropDown";
import {useViewToggle} from "../model/zustand";

const calendarGridOptions = [
  {title: "Day", value: "day"},
  {title: "Week", value: "week"}
];

export const CalendarVievToggle = () => {
  const setCalendarView = useViewToggle((state) => state.setCalendarView);

  return (
    <DropDown
      options={calendarGridOptions}
      onOptionChange={(e) => setCalendarView(e)}
      style={{padding: ".2rem 1.4rem .2rem .8rem", borderRadius: ".6rem"}}
    />
  );
};
