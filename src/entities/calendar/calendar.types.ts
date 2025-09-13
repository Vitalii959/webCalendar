export type CalendarTypes = {
  title: string;
  id: string;
  ownerId: string;
  color: string;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type CalendarCreate = {title: string; color: string};

export type CalendarUpdate = {title?: string; color?: string};

export type Errors = {title: string; color: string};
