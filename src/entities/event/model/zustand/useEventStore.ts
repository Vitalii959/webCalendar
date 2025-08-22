import {create} from "zustand";
import {addEventFirestore} from "../api";
import type {EventType} from "../types";
import {useUserStore} from "@/entities/user/model/zustand";
import type {DBEvent} from "../types/event.types";
import {deleteEventDB, editEventDB, startEventListener} from "../api/api";

type EventsStore = {
  events: DBEvent[];
  deleteStatus: "idle" | "pending" | "success" | "error";
  setEvents: (data: DBEvent[]) => void;
  addEvent: (data: EventType) => Promise<string>;
  editEvent: (event: EventType, id: string) => void;
  deleteEvent: (id: string) => void;
  startSync: (userId: string) => void;
  stopSync: () => void;
};

let unsubscribe: (() => void) | undefined;

export const useEventStore = create<EventsStore>((set) => ({
  events: [],
  deleteStatus: "idle",

  setEvents: (data) => set({events: data}),

  addEvent: async (data) => {
    const user = useUserStore.getState().user;
    if (!user) throw new Error("Not authorized");

    const fullEvent = {...data, userId: user.uid};

    const id = await addEventFirestore(fullEvent);
    return id;
  },
  editEvent: (event, id) => {
    const {user} = useUserStore.getState();

    if (!user) throw new Error("Not authorized");
    editEventDB(event, id, user.uid);
  },

  deleteEvent: async (id) => {
    set({deleteStatus: "pending"});

    try {
      await deleteEventDB(id);
      set({deleteStatus: "success"});
    } catch (error) {
      console.error(error);
      set({deleteStatus: "error"});
    }
  },

  startSync: (userId: string) => {
    unsubscribe?.();
    unsubscribe = startEventListener(userId, (events) => {
      set({events});
    });
  },

  stopSync: () => {
    unsubscribe?.();
    unsubscribe = undefined;
  }
}));
