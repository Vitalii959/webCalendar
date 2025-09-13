import {create} from "zustand";

type ToastStore = {
  showToast: boolean;
  content: string;
  delayMsec: number;
  timerId?: number;
  setToast: (content: string, delay?: number) => void;
  hide: () => void;
};

export const useToastStore = create<ToastStore>((set, get) => ({
  showToast: false,
  content: "",
  delayMsec: 2000,
  timerId: undefined,
  setToast: (content, delay) => {
    const d = delay ?? get().delayMsec;
    set({showToast: true, content: content});

    const id = window.setTimeout(() => {
      get().hide();
    }, d);

    set({timerId: id});
  },
  hide: () => {
    window.clearTimeout(get().timerId);
    set({showToast: false, content: "", timerId: undefined});
  }
}));
