import {Routes, Route} from "react-router";
import {WebCalendar} from "@/Pages/ui/WebCalendar";
import {Auth} from "@/Pages/ui/auth";
import {useUserStore} from "@/entities/user/model/zustand";
import {Navigate} from "react-router";

export const AppRoutes = () => {
  const {user, isAuthChecked} = useUserStore();

  if (!isAuthChecked) return <h1>Loading...</h1>;

  return (
    <Routes>
      <Route
        path='/'
        element={user ? <Navigate to='/calendar' /> : <Navigate to='/auth' />}
      />
      <Route path='/calendar' element={<WebCalendar />} />
      <Route path='/auth' element={<Auth />} />
    </Routes>
  );
};
