import type {DBEvent} from "@/entities/event/event.types";
import {useCurrentDateStore} from "@/features/calendar-navigation/model/zustand";
// import { useEventStore } from "@/features/create-event/model";
import {useMemo} from "react";
import {EventInfoModalForm} from "../../../entities/event/ui/EventInfoModalForm/EventInfoModalForm";
import {useModalStore} from "@/shared/lib/modal-storage";
import {EventForm} from "@/features/create-event/ui/EventForm";
import {DeleteConfirmationForm} from "@/shared/ui/delete-confirmation-form";
import {eventActions} from "@/features/create-event/model/actions";
import {createWeekArray} from "../helper/calendarContainer.handler";

export const useCalendarLogic = () => {
  const currentDate = useCurrentDateStore((s) => s.currentDate);

  const weekDayArray = useMemo(() => {
    return createWeekArray(currentDate);
  }, [currentDate]);

  const setModalContent = useModalStore((s) => s.setModalContent);
  const closeModal = useModalStore((s) => s.closeModal);

  const onEventClick = (event: DBEvent) => {
    // eslint-disable-next-line
    const {id, userId: _userId, ...rest} = event;

    setModalContent(
      "Event Information",
      true,
      <EventInfoModalForm defaultValues={event} />,
      () =>
        // passing modal content for edit/delete buttons
        setModalContent(
          "edit event",
          true,
          <EventForm mode='edit' defaultValues={rest} id={id} />
        ),
      () => setModalContent("Delete Event", true, deleteModal(event))
    );
  };
  const deleteModal = (event: DBEvent) => {
    const deleteFn = () => {
      closeModal();
      eventActions.deleteEvent(event.id);
    };
    return (
      <DeleteConfirmationForm
        eventTitle={event.eventTitle ? `'${event.eventTitle}'` : "Event"}
        deleteFn={deleteFn}
        cancelFn={closeModal}
      />
    );
  };

  const onEmptyCellClick = (date: Date) => {
    setModalContent(
      "Create Event",
      true,
      <EventForm mode='create' createOnSpecialDate={date} />
    );
  };

  return {
    weekDayArray,

    onEventClick,
    onEmptyCellClick
  };
};
