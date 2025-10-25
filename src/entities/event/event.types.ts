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
  calendar: {calendarName: string; calendarId: string};
  description: string;
};

export type EventCreate = EventType & {ownerId: string; createdAt: Date};
export type EventEdit = EventType & {updatedAt: string};

// after pulling event from firestore assigning event and use id's
export type DBEvent = EventType & {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
