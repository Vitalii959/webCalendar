import "./calendarItem.css";

import {Icons} from "@/shared/ui/icons";
import {CheckBox} from "@/shared/ui/checkBox";
import type {CalendarTypes} from "@/entities/calendar/calendar.types";

import {useModalStore} from "@/shared/lib/modal-storage";
import {CalendarsFilterForm} from "@/features/calendars-filter/ui/CalendarsFilterForm";
import {useCalendarStore} from "../../model/useCalendarStore";
import {calendarActions} from "../../model/actions";

type CalendarItemType = {item: CalendarTypes};
type editBtnClickProps = (item: CalendarTypes) => void;

export const CalendarItem = ({item}: CalendarItemType) => {
  const {setModalContent} = useModalStore.getState();
  const selectedIds = useCalendarStore((s) => s.selectedIds);
  const {toggleSelectedIds} = useCalendarStore.getState();
  const deleteCalendar = calendarActions.deleteCalendar;

  const handleEditBtnClick: editBtnClickProps = (item) => {
    setModalContent(
      "Edit calendar",
      true,
      <CalendarsFilterForm mode='edit' item={item} />
    );
  };

  return (
    <div className='myCalendar__calendarBox' key={item.id}>
      <div
        className='myCalendar__checkbox'
        onClick={() => {
          toggleSelectedIds(item.id);
        }}
        style={{
          backgroundColor: selectedIds.includes(item.id)
            ? `${item.color}62`
            : "transparent",
          borderRadius: "4px"
        }}
      >
        <CheckBox
          checked={selectedIds.includes(item.id)}
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
