// import {create} from "zustand";

// export type EventType = {
//   title: string;
//   date: string;
//   time: string;
//   repeat: string;
//   calendar: string;
//   description: string;
// };

// export type CreateEvent = {
//   events: EventType[];
//   setEvent: (newEvent: EventType) => void;
// };

// export const useSaveEvent = () =>
//   create<CreateEvent>((set) => ({
//     events: [],
//     setEvent: (newEvent) =>
//       set((state) => ({
//         events: [...state.events, {...newEvent}]
//       }))
//   }));
