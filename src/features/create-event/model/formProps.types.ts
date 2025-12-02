import type {EventType} from "@/entities/event/event.types";

type CreateMode = {
  mode: "create";
  defaultValues?: never;
  createOnSpecialDate?: Date;
};
type EditMode = {
  mode: "edit";
  defaultValues: EventType;
  id: string;
};

export type FormProps = CreateMode | EditMode;
