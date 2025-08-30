import "./calendarItem.css";

import {Icons} from "@/shared/ui-kit/icons";
import {CheckBox} from "@/shared/ui-kit/ui/checkBox";
import type {CalendarTypes} from "../../model/types";

import {useModalStore} from "@/entities/service/model/modal-storage-local";
import {CalendarsFilterForm} from "@/features/calendars-filter/ui/CalendarsFilterForm";
import {useCalendarStore} from "@/entities/calendar/model/zustand";

type CalendarItemType = {item: CalendarTypes};
type editBtnClickProps = (item: CalendarTypes) => void;

export const CalendarItem = ({item}: CalendarItemType) => {
  const openModal = useModalStore((state) => state.setModalContent);
  const {deleteCalendar} = useCalendarStore();
  const handleCheckboxChange = useCalendarStore(
    (state) => state.handleCheckboxChange
  );

  const handleEditBtnClick: editBtnClickProps = (item) => {
    openModal(
      "Edit calendar",
      true,
      <CalendarsFilterForm mode='edit' item={item} />
    );
  };
  console.log(item.color);

  return (
    <div className='myCalendar__calendarBox' key={item.id}>
      <div
        className='myCalendar__checkbox'
        onClick={() => {
          handleCheckboxChange(item.id);
        }}
        style={{
          backgroundColor: item.checked ? `${item.color}62` : "transparent",
          borderRadius: "4px"
        }}
      >
        <CheckBox
          checked={item.checked}
          name='myCalendar1'
          iconColor={item.color}
          title={item.title}
        />
      </div>

      <div className='myCalendar__btns'>
        {item.id != "default-id" && (
          <div
            className='myCalendar__editBtn'
            onClick={() => handleEditBtnClick(item)}
          >
            <Icons name='edit' />
          </div>
        )}
        {item.id != "default-id" && (
          <div
            className='myCalendar__removeBtn'
            onClick={() => deleteCalendar(item.id)}
          >
            <Icons name='delete' />
          </div>
        )}
      </div>
    </div>
  );
};
