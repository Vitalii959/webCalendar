import "./calendarsFilterForm.css";
import {useEffect, useState} from "react";
import {InputField} from "@/shared/ui/inputField/InputField";
import {ColorPicker} from "@/shared/ui/colorPicker";
import {Button} from "@/shared/ui/Button";
import {colorArray} from "../../model/helpers";
import {validate} from "../../model/validation";

import type {CalendarTypes, Errors} from "../../../../entities/calendar";
import {useModalStore} from "@/shared/lib/modal-storage";
import {calendarActions} from "@/features/calendars-filter-panel/model/actions";
import {selectedCalendarsStore} from "../../model/selectedCalendarsStore";
import {useToastStore} from "@/shared/lib/toast-storage";

type CalendarCreate = {title: string; color: string};
const baseForm: CalendarCreate = {
  title: "",
  color: ""
};
type CreateMode = {
  mode: "create";
  item?: never;
};
type EditMode = {
  mode: "edit";
  item: CalendarTypes;
};
type Props = CreateMode | EditMode;

export const CalendarsFilterForm = ({mode, item}: Props) => {
  const status = selectedCalendarsStore((s) => s.calendarStatus);
  const setToast = useToastStore.getState().setToast;

  useEffect(() => {
    if (status === "error") setToast("Error", 2000);
    if (status === "success") setToast("Saved", 2000);
  }, [status, setToast]);
  const initialForm = (): CalendarCreate =>
    mode === "edit" ? {title: item.title, color: item.color} : {...baseForm};

  const [draftCalendar, setDraftCalendar] = useState(initialForm);
  const [errors, setErrors] = useState<Errors>({title: "", color: ""});

  const closeModal = useModalStore((s) => s.closeModal);

  const onEventFormSave = async () => {
    const {valid, errors} = validate(draftCalendar);
    if (!valid) return setErrors(errors);

    if (mode === "create") {
      await calendarActions.createCalendar(draftCalendar);
    } else {
      await calendarActions.updateCalendar(item.id, draftCalendar);
    }
    closeModal();
  };

  return (
    <div className='createCalendar__wrapper'>
      <div className='createCalendar__section-box'>
        <div className='createCalendar__section-icon'>T</div>
        <div className='createCalendar__section-content'>
          <InputField
            title='Title'
            type='text'
            error={errors.title}
            defaultValue={draftCalendar.title}
            placeholder='Enter title'
            onChange={(e) => setDraftCalendar({...draftCalendar, title: e})}
          />
        </div>
      </div>
      <div className='createCalendar__section-box'>
        <div className='createCalendar__section-icon'>I</div>
        <div className='createCalendar__section-content'>
          <ColorPicker
            colorOptions={colorArray}
            colorPicked={draftCalendar.color}
            setColorPicked={(e) =>
              setDraftCalendar({...draftCalendar, color: e})
            }
          />
          <p className='flex text-xs text-[#ff5620] mt-1'>{errors.color} </p>
        </div>
      </div>
      <div className='createCalendar__saveBtn'>
        <Button options='primary' onClick={onEventFormSave}>
          Save
        </Button>
      </div>
    </div>
  );
};
