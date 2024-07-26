import type { Notifications } from "../ui/notifications";

export type Notification = {
  id: number;
  type: "success" | "error" | "info";
  title?: string;
  message: string;
};

export type NotificationsType = Notifications;
