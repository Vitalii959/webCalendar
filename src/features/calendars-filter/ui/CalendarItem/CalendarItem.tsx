import "./calendarItem.css";

import {Icons} from "@/shared/ui-kit/icons";
import {CheckBox} from "@/shared/ui-kit/ui/checkBox";
import {editCalendar} from "../../model/handlers";
import type {CalendarTypes} from "../../model/types";

import {useModalStore} from "@/entities/service/model/modal-storage.local";
import {CalendarsFilterForm} from "@/features/calendars-filter/ui/CalendarsFilterForm";

type CalendarItemType = {item: CalendarTypes};
type editBtnClickProps = (
  itemTitle: string,
  itemColor: string,
  itemId: number
) => void;

export const CalendarItem = ({item}: CalendarItemType) => {
  const openModal = useModalStore((state) => state.setModalContent);

  const handleEditBtnClick: editBtnClickProps = (
    itemTitle,
    itemColor,
    itemId
  ) => {
    openModal(
      "Edit calendar",
      true,
      <CalendarsFilterForm name={itemTitle} color={itemColor} id={itemId} />
    );
  };

  return (
    <div className='myCalendar__calendarBox' key={item.id}>
      <div
        className='myCalendar__checkbox'
        onClick={() =>
          editCalendar(item.id, {
            checked: !item.checked
          })
        }
      >
        <CheckBox
          checked={item.checked}
          name='myCalendar1'
          iconColor={item.color}
        />
      </div>
      <div className='myCalendar__textArea'>{item.title}</div>
      <div
        className='myCalendar__editBtn'
        onClick={() => handleEditBtnClick(item.title, item.color, item.id)}
      >
        <Icons name='edit' />
      </div>
      <div className='myCalendar__removeBtn'>
        <Icons name='delete' />
      </div>
    </div>
  );
};
