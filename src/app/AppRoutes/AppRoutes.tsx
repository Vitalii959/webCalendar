import {Routes, Route} from "react-router-dom";
import {WebCalendarLayout} from "@/Pages/ui/webCalendarLayout";
import {Auth} from "@/Pages/ui/auth";
import {useUserStore} from "@/entities/user/model/zustand";
import {Navigate} from "react-router";
import {WeekView} from "@/features/MainCalendar/calendar-view/ui/week-view";

export const AppRoutes = () => {
  const {isAuthenticated, user} = useUserStore();

  if (!isAuthenticated) return <h1>Loading...</h1>;
  return (
    <Routes>
      <Route
        path='/'
        element={
          user ? (
            <Navigate to='/calendar' replace />
          ) : (
            <Navigate to='/auth' replace />
          )
        }
      />

      <Route path='/auth' element={<Auth />} />

      <Route
        path='/calendar'
        element={user ? <WebCalendarLayout /> : <Navigate to='/auth' replace />}
      >
        <Route index element={<Navigate to='week' replace />} />
        <Route path='day' element={<WeekView mode='day' />} />
        <Route path='week' element={<WeekView mode='week' />} />
      </Route>

      <Route
        path='*'
        element={
          user ? <Navigate to='/calendar/week' /> : <Navigate to='/auth' />
        }
      />
    </Routes>
  );
};
