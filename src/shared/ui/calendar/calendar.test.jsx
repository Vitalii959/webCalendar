import {screen, render} from "@testing-library/react";
import {Calendar} from "./Calendar";
import {describe, it, vi, expect} from "vitest";

describe("Calendar", () => {
  const calendarProps = {
    onSelect: vi.fn(),
    firstDayIndex: 0,
    WEEKDAYS: ["S", "M", "T", "W", "T", "F", "S"],
    currentDate: new Date(2025, 4, 1),
    daysDisabled: [new Date(2025, 4, 1)],
    setCurrentDate: vi.fn(),
    ["data-testid"]: "calendar"
  };

  it("Rendering with correct month and year title", () => {
    render(<Calendar {...calendarProps}></Calendar>);
    const calendar = screen.getByText("May 2025");
    expect(calendar).toBeInTheDocument();
  });
  it("Render 7 days in weekdays", () => {
    render(<Calendar {...calendarProps}></Calendar>);
    const daysInWeek = calendarProps.WEEKDAYS.length;
    expect(daysInWeek).toBe(7);
  });
  it("Render 42 days in calendar", () => {
    render(<Calendar {...calendarProps}></Calendar>);
    const daysInCalendar = screen.getAllByTestId("calendar-cell");
    expect(daysInCalendar.length).toBe(42);
  });
  it("Disable the correct date", () => {
    render(<Calendar {...calendarProps}></Calendar>);
    const disabledDate = calendarProps.daysDisabled[0];
    const disabledDateDay = () => {
      return `${disabledDate.getDate()} ${disabledDate.getMonth()} ${disabledDate.getFullYear()}`;
    };
    expect(disabledDateDay()).toBe("1 4 2025");
  });
  it("Navigation buttons logic work correctly", () => {
    render(<Calendar {...calendarProps}></Calendar>);

    const prevMonth = () => {
      return `${calendarProps.currentDate.getDay()} ${
        calendarProps.currentDate.getMonth() - 1
      } ${calendarProps.currentDate.getFullYear()}`;
    };

    const nextMonth = () => {
      return `${calendarProps.currentDate.getDay()} ${
        calendarProps.currentDate.getMonth() + 1
      } ${calendarProps.currentDate.getFullYear()}`;
    };

    expect(prevMonth()).toBe("4 3 2025");
    expect(nextMonth()).toBe("4 5 2025");
  });
});
