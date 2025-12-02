import {create} from "zustand";
import {signOut, type User} from "firebase/auth";
import {auth} from "@/shared/lib/firebase/config";
import type {StatusType} from "@/shared/lib/status";

type Store = {
  user: User | null;
  isAuthenticated: boolean;
  logoutStatus: StatusType;
  setUser: (userInfo: User | null) => void;
  setAuthChecked: () => void;
  logout: () => void;
};

export const useUserStore = create<Store>((set) => ({
  user: null,
  isAuthenticated: false,
  logoutStatus: "idle",
  setUser: (userInfo) => set({user: userInfo}),
  setAuthChecked: () => set({isAuthenticated: true}),
  logout: async () => {
    set({logoutStatus: "loading"});
    try {
      await signOut(auth);

      set({user: null, logoutStatus: "success"});
    } catch (error) {
      set({logoutStatus: "error"});
      console.error(error);
    }
  }
}));
