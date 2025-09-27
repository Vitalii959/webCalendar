import {useUserStore} from "@/entities/user/model/zustand";

export const requireUid = () => {
  const uid = useUserStore.getState().user?.uid;
  if (!uid) throw new Error("Not authorized");
  return uid;
};
