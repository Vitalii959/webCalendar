import {useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "@/shared/lib/firebase/config";
import {useUserStore} from "@/entities/user/model/useUserStore";

export const AuthListener = () => {
  const {setUser, setAuthChecked} = useUserStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ?? null);
      setAuthChecked();
    });
    return () => unsubscribe();
  }, [setUser, setAuthChecked]);
  return null;
};
