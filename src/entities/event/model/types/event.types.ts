// used when creating event
export type EventType = {
  eventTitle: string;
  eventDate: {
    day: Date;
    startTime: Date;
    endTime: Date;
  };
  allDayChecked: boolean;
  repeatRule: string;
  calendarName: string;
  description: string;
};

// after pulling event from firestore assigning event and use id's
export type DBEvent = EventType & {id: string; userId: string};
