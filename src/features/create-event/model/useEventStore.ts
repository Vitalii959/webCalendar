import {create} from "zustand";
import type {DBEvent} from "@/entities/event/event.types";

import type {StatusType} from "@/shared/lib/status";

type EventsStore = {
  events: DBEvent[];
  eventStatus: StatusType;
  setEvents: (data: DBEvent[]) => void;
  setEventStatus: (status: StatusType) => void;
};

export const useEventStore = create<EventsStore>((set) => ({
  events: [],
  eventStatus: "idle",

  setEvents: (data) => set({events: data}),
  setEventStatus: (status) => ({
    eventStatus: status
  })
}));
