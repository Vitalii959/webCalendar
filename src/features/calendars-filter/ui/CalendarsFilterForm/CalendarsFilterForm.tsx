import "./calendarsFilterForm.css";
import {useState} from "react";
import {InputField} from "@/shared/ui-kit/ui/inputField/InputField";
import {ColorPicker} from "@/shared/ui-kit/ui/colorPicker/";
import {Button} from "@/shared/ui-kit/ui/Button";
import {colorArray} from "../../model/helpers";
import {validate} from "../../model/validation";
import {useNavigate} from "react-router";

import type {Errors} from "../../model/types";
import {useUserStore} from "@/entities/user/model/zustand";
import {useModalStore} from "@/entities/service/model/modal-storage-local";
import {useCalendarStore} from "@/entities/calendar/model/zustand";

const baseForm = {
  title: "",
  color: ""
};
type CreateMode = {
  mode: "create";
  item?: never;
};
type EditMode = {
  mode: "edit";
  item: {
    title: string;
    color: string;
    id: string;
    ownerId: string;
    checked: boolean;
  };
};
type Props = CreateMode | EditMode;

export const CalendarsFilterForm = ({mode, item}: Props) => {
  const initialForm = () => {
    if (mode === "edit") {
      return {
        title: item.title,
        color: item.color,
        id: item.id
      };
    } else {
      return {...baseForm};
    }
  };
  const [draftCalendar, setDraftCalendar] = useState(() => initialForm());
  const [errors, setErrors] = useState<Errors>({title: "", color: ""});
  const user = useUserStore((state) => state.user);
  const {addCalendar, editCalendar} = useCalendarStore();
  const navigate = useNavigate();
  const {closeModal} = useModalStore();

  const handleSave = async () => {
    if (!user?.uid) return navigate("/auth");

    const {valid, errors} = validate(draftCalendar);
    if (!valid) return setErrors(errors);

    try {
      if (mode === "create") {
        await addCalendar(draftCalendar, user.uid);
      }
      if (mode === "edit") {
        await editCalendar(draftCalendar, item.id);
      }
      closeModal();
    } catch (error) {
      console.log(error);
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
            error={errors.title}
            defaultValue={draftCalendar.title}
            // value={draftCalendar.title}
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
        <Button options='primary' onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};
