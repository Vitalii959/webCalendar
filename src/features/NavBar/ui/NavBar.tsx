import "./NavBar.css";

import NavLogo from "@/../public/assets/Logo.png";

import {CalendarVievToggle} from "@/features/calendar-view-toggle/ui";
import {CalendarNavigation} from "@/features/calendar-navigation/ui";
import {useRef, useState} from "react";
import {useUserStore} from "@/entities/user/model/zustand";
import {useClickOutside} from "@/shared/hooks";
import {Button} from "@/shared/ui/Button";

export const NavBar = () => {
  const [logoutVisibility, setLogoutVisibility] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setLogoutVisibility(false));
  const {logoutStatus, user} = useUserStore();
  const fullName = user?.displayName || "Guest";
  const nameArray = fullName.split(" ")[0];

  const userName = nameArray;

  const userLogo = userName.charAt(0);

  if (logoutStatus === "loading") return <h2>Loading...</h2>;

  return (
    <nav className='navbar__background-color'>
      <div className='navbar container'>
        <div className='navbar-leftSide'>
          <div className='navbar__logo'>
            <img src={NavLogo} alt='WebCalendar' />
          </div>
          <div className='calendarNavigation__wrapper'>
            <CalendarNavigation />
          </div>
        </div>
        <div className='navbar-rightSide'>
          <div className='navbar__calendarGridOptions'>
            {<CalendarVievToggle />}
          </div>
          <div
            className='navbar__userInfo'
            onClick={() => setLogoutVisibility(true)}
            ref={ref}
          >
            <p className='username'>{userName}</p>
            <p className='userLogo'>{userLogo}</p>
            {logoutVisibility && (
              <div className='navbar_logoutBtn'>
                <Button
                  style={{background: "white"}}
                  options='secondary'
                  icon='logout'
                  onClick={useUserStore.getState().logout}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
