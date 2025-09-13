export const STATUS = {
  SUCCESS: "success",
  ERROR: "error",
  LOADING: "loading",
  IDLE: "idle",
  PENDING: "pending"
} as const;

export type StatusType = (typeof STATUS)[keyof typeof STATUS];
