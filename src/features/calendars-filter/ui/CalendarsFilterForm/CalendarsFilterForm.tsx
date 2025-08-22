import "./calendarsFilterForm.css";
import {useState} from "react";
import {InputField} from "@/shared/ui-kit/ui/inputField/InputField";
import {ColorPicker} from "@/shared/ui-kit/ui/colorPicker/";
import {Button} from "@/shared/ui-kit/ui/Button";

import {
  editCalendar,
  addNewCalendar
} from "@/features/calendars-filter/model/handlers/editCalendar.handlers";

export type CalendarFormProps = {
  name?: string;
  color?: string;
  id?: number;
};

const colorArray = [
  "#9F2957",
  "#D90056",
  "#E25D33",
  "#DFC45A",
  "#B8C42F",
  "#16AF6E",
  "#429488",
  "#397E49",
  "#439BDF",
  "#4254AF",
  "#6C7AC4",
  "#8332A4"
];

export const CalendarsFilterForm = ({name, color, id}: CalendarFormProps) => {
  const [draftCalendarName, setDraftCalendarName] = useState(name || "");
  const [draftCalendarColor, setDraftCalendarColor] = useState(color || "");

  const onSave = () => {
    if (!id) {
      addNewCalendar(draftCalendarName, draftCalendarColor);
    }
    if (id) {
      const title = draftCalendarName;
      const color = draftCalendarColor;
      editCalendar(id, {title, color});
    }
  };

  return (
    <div className='createCalendar__wrapper'>
      <div className='createCalendar__section-box'>
        <div className='createCalendar__section-icon'>T</div>
        <div className='createCalendar__section-content'>
          <InputField
            title='Title'
            type='text'
            value={draftCalendarName}
            placeholder='Enter title'
            onChange={(e) => setDraftCalendarName(e)}
          />
        </div>
      </div>
      <div className='createCalendar__section-box'>
        <div className='createCalendar__section-icon'>I</div>
        <div className='createCalendar__section-content'>
          <ColorPicker
            colorOptions={colorArray}
            colorPicked={draftCalendarColor}
            setColorPicked={setDraftCalendarColor}
          />
        </div>
      </div>
      <div className='createCalendar__saveBtn'>
        <Button
          options='primary'
          onClick={() => onSave()}
          disabled={!draftCalendarName && !draftCalendarColor}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
