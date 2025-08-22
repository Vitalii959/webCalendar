import {useCalendarsListStore} from "@/features/calendars-filter/model/zustand";
import {useModalStore} from "@/entities/service/model/modal-storage-local";

type EditProps = (
  id: number,
  update: {
    checked?: boolean;
    title?: string;
    color?: string;
  }
) => void;

export const editCalendar: EditProps = (id, update) => {
  const editCalendar = useCalendarsListStore.getState().editCalendar;
  const closeModal = useModalStore.getState().closeModal;
  editCalendar(id, update);
  closeModal();
};

type NewCalendarProps = (title: string, color: string) => void;

export const addNewCalendar: NewCalendarProps = (title, color) => {
  const addNewCalendar = useCalendarsListStore.getState().addNewCalendar;
  const closeModal = useModalStore.getState().closeModal;
  addNewCalendar(title, color);
  closeModal();
};
