import "./calendar.css";
import {Icons} from "@/shared/ui-kit/icons";
import classNames from "classnames";
import {useEffect, useState} from "react";

export type CalendarTypes = {
  globalDate: Date;
  onSelect: (data: Date) => void;
  daysDisabled?: Date[];
};

export type getGridType = (year: number, month: number) => Date[];

export type navigateMonthType = (direction: string) => void;

const firstDayIndex = 0;
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export function Calendar({
  globalDate,
  onSelect,
  daysDisabled,
  ...restProps
}: Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> & CalendarTypes) {
  const [localDate, setLocalDate] = useState(
    () => new Date(globalDate || new Date())
  );

  useEffect(() => {
    setLocalDate(new Date(globalDate));
  }, [globalDate]);
  const currentMonthName = localDate.toLocaleString("default", {
    month: "long"
  });

  const getGridOfDate: getGridType = (year, month) => {
    const result = [];
    const firstDay = new Date(year, month, 1);
    const startDayIndex = firstDay.getDay() + firstDayIndex;

    for (let i = 1 - startDayIndex; i <= 42 - startDayIndex; i++) {
      result.push(new Date(year, month, i));
    }

    return result;
  };

  const navigateMonth: navigateMonthType = (direction) => {
    const prev = direction === "prev";
    const next = direction === "next";
    if (prev) {
      setLocalDate(new Date(localDate.setMonth(localDate.getMonth() - 1)));
    }
    if (next) {
      setLocalDate(new Date(localDate.setMonth(localDate.getMonth() + 1)));
    }
  };

  const currentYear = localDate.getFullYear();
  const currentMonth = localDate.getMonth();
  const daysGrid = getGridOfDate(currentYear, currentMonth);

  return (
    <div className='calendar' {...restProps}>
      <div className='calendar__header'>
        <h2 className='calendar__header-title'>{`${currentMonthName}${" "}${currentYear}`}</h2>
        <div className='calendar__header-navigator-btn'>
          <div
            className='calendar__header-navigator-prev'
            onClick={() => navigateMonth("prev")}
          >
            <Icons name='arrowLeft' />
          </div>
          <div
            className='calendar__header-navigator-next'
            onClick={() => navigateMonth("next")}
          >
            <Icons name='arrowRight' />
          </div>
        </div>
      </div>
      <div className='calendar__body'>
        <div className='calendar__weekdays'>
          {WEEKDAYS.map((day, index) => (
            <div key={index} className='calendar-days'>
              {day}
            </div>
          ))}
        </div>

        <div className='calendar__days'>
          {daysGrid.map((data) => {
            const today = new Date();

            const isToday =
              data.getDate() === today.getDate() &&
              data.getMonth() === today.getMonth() &&
              data.getFullYear() === today.getFullYear();

            const isCurrentMonth =
              data.getMonth() === localDate.getMonth() &&
              data.getFullYear() === localDate.getFullYear();

            const isDisabled = daysDisabled?.some((day) => {
              return (
                data.getDate() === day.getDate() &&
                data.getMonth() === day.getMonth() &&
                data.getFullYear() === day.getFullYear()
              );
            });

            const isCurrentDate =
              data.getDate() === globalDate.getDate() &&
              data.getMonth() === globalDate.getMonth() &&
              data.getFullYear() === globalDate.getFullYear();

            return (
              <div
                key={data.toDateString()}
                className={classNames(
                  "calendar-cells",
                  {today: isToday},
                  {["other-month"]: !isCurrentMonth},
                  {["currentDay"]: isCurrentDate},
                  {disabled: isDisabled}
                )}
                onClick={() => {
                  onSelect(data);
                }}
                data-testid='calendar-cell'
              >
                {data.getDate()}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
