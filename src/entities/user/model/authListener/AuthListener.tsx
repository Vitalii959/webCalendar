import {useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "@/shared/lib/firebase/config";
import {useUserStore} from "@/entities/user/model/zustand";

import {useNavigate} from "react-router";

export const AuthListener = () => {
  const {setUser, setAuthChecked} = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ?? null);
      setAuthChecked();
    });
    return () => unsubscribe();
  }, [setUser, setAuthChecked, navigate]);
  return null;
};
