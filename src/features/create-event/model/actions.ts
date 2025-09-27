import type {EventType, EventCreate} from "@/entities/event/event.types";
import {eventRepository} from "@/entities/event/model/repository";
import {requireUid} from "@/shared/lib/auth/requireUid";

export const eventActions = {
  addEvent: async (data: EventType) => {
    const uid = requireUid();

    const eventWithOwnerId: EventCreate = {
      ...data,
      ownerId: uid,
      createdAt: new Date()
    };

    return await eventRepository.addEvent(uid, eventWithOwnerId);
  },
  editEvent: async (event: EventType, id: string) => {
    const uid = requireUid();

    const {
      eventTitle,
      eventDate,
      allDayChecked,
      repeatRule,
      calendarName,
      description
    } = event;

    await eventRepository.editEvent(uid, id, {
      eventTitle,
      eventDate,
      allDayChecked,
      repeatRule,
      calendarName,
      description
    });
  },
  deleteEvent: async (id: string) => {
    const uid = requireUid();

    await eventRepository.deleteEvent(uid, id);
  }
};
