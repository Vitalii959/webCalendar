import "./CalendarContainer.css";

import {CalendarHeader} from "../calendar-header";
import {CalendarSideBar} from "../calendar-side-bar";
import {CalendarGrid} from "../calendar-grid";

import {useCurrentDateStore} from "@/features/calendar-navigation/model/zustand";
import {useEventStore} from "@/entities/event/model/zustand";

import {eachHourOfInterval, startOfDay, endOfDay} from "date-fns";
import {createWeekArray} from "../../helper/calendarContainer.handler";
import {useModalStore} from "@/entities/service/model/modal-storage-local";
import {EventInfoModalForm} from "@/entities/event/ui/EventInfoModalForm";
import {EventForm} from "@/features/create-event/ui/EventForm";

import {useEffect, useMemo} from "react";

import type {DBEvent} from "@/entities/event/model/types/event.types";
import {useToastStore} from "@/entities/service/model/toast-storage-local";
import {DeleteConfirmationForm} from "@/shared/ui-kit/ui/delete-confirmation-form";

const hoursArray = () => {
  return eachHourOfInterval({
    start: startOfDay(new Date()),
    end: endOfDay(new Date())
  });
};

export const CalendarContainer = () => {
  const hours = useMemo(() => hoursArray(), []);
  const {currentDate} = useCurrentDateStore();

  const {events, deleteEvent} = useEventStore();
  const {deleteStatus} = useEventStore();
  const {setModalContent} = useModalStore();
  const {closeModal} = useModalStore();

  const {show} = useToastStore();

  useEffect(() => {
    if (deleteStatus === "success") show("Event has been deleted");
    if (deleteStatus === "error") show("Error");
  }, [deleteStatus, show]);

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
      () => setModalContent("Delete Event", true, renderDeleteModal(event))
    );
  };
  const renderDeleteModal = (event: DBEvent) => {
    const deleteFn = () => {
      closeModal();
      deleteEvent(event.id);
    };
    return (
      <DeleteConfirmationForm
        eventTitle={event.eventTitle ? `EventTitle ${event.eventTitle}` : "it"}
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
  const weekArray = createWeekArray(currentDate || new Date());
  return (
    <div className='calendar-grid'>
      <div className='calendarGrid__scrollWrapper'>
        <div className='calendarGrid__container'>
          <div className='calendarGrid__header'>
            <div className='calendarGrid__header-days'>
              <div className='empty-slot' />
              <CalendarHeader weekArray={weekArray} />
            </div>
          </div>
          <div className='calendarGrid__main'>
            <div className='calendarGrid__main-container'>
              <div className='calendarGrid__hours-sidePanel'>
                <CalendarSideBar hoursArray={hours} />
              </div>
              <CalendarGrid
                weekArray={weekArray}
                events={events}
                onEventClick={onEventClick}
                onEmptyCellClick={onEmptyCellClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
