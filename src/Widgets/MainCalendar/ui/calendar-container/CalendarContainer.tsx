import "./CalendarContainer.css";

import {CalendarHeader} from "../calendar-header";
import {CalendarSideBar} from "../calendar-side-bar";
import {CalendarGrid} from "../calendar-grid";

import {useCurrentDateStore} from "@/features/calendar-navigation/model/zustand";
import {useEventStore} from "@/features/create-event/model";

import {eachHourOfInterval, startOfDay, endOfDay} from "date-fns";
import {createWeekArray} from "../../helper/calendarContainer.handler";
import {useModalStore} from "@/shared/lib/modal-storage";
import {EventInfoModalForm} from "@/entities/event/ui/EventInfoModalForm";
import {EventForm} from "@/features/create-event/ui/EventForm";

import {useEffect, useMemo} from "react";

import type {DBEvent} from "@/entities/event/event.types";
import {useToastStore} from "@/shared/lib/toast-storage";
import {DeleteConfirmationForm} from "@/shared/ui/delete-confirmation-form";
import {eventActions} from "../../../../features/create-event/model/actions";

const hoursArray = () => {
  return eachHourOfInterval({
    start: startOfDay(new Date()),
    end: endOfDay(new Date())
  });
};

export const CalendarContainer = () => {
  const hours = useMemo(() => hoursArray(), []);
  const currentDate = useCurrentDateStore((s) => s.currentDate);

  const events = useEventStore((s) => s.events);
  const deleteStatus = useEventStore((s) => s.eventStatus);
  const setModalContent = useModalStore.getState().setModalContent;
  const {closeModal} = useModalStore();

  const filterByCheckedCalendars = () => {
    const filteredEvents = events;

    return filteredEvents;
  };

  const eventsToShow = useMemo(filterByCheckedCalendars, [events]);

  const {setToast} = useToastStore();

  useEffect(() => {
    if (deleteStatus === "success") setToast("Event has been deleted");
    if (deleteStatus === "error") setToast("Error");
  }, [deleteStatus, setToast]);

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
      eventActions.deleteEvent(event.id);
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
                events={eventsToShow}
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
