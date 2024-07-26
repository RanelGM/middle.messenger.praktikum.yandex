import type { Notification, NotificationsType } from "./types";

export class Notificator {
  static __instance: Notificator | null;
  element: HTMLDivElement | undefined;
  notificationsClass: NotificationsType | undefined;
  notifications: Notification[] = [];

  constructor() {
    if (Notificator.__instance) {
      return Notificator.__instance;
    }

    Notificator.__instance = this;
  }

  public init(notificationsClass: NotificationsType) {
    const element = document.createElement("div");
    const content = notificationsClass.getContent();

    if (content) {
      element.append(content);
    }

    document.body.append(element);
    this.element = element;
    this.notificationsClass = notificationsClass;
  }

  public success(message: string) {
    this.open({ id: this.getId(), type: "success", title: "Успех", message });
  }

  public error(message: string) {
    this.open({ id: this.getId(), type: "error", title: "Ошибка", message });
  }

  public info(message: string) {
    this.open({ id: this.getId(), type: "info", title: "Информация", message });
  }

  public close(id: Notification["id"]) {
    this.notifications = this.notifications.filter((item) => item.id !== id);
    this.update(this.notifications);
  }

  private getId() {
    return Math.random();
  }

  private open(notification: Notification) {
    this.notifications = [...this.notifications, notification];
    this.update(this.notifications);

    setTimeout(() => {
      this.close(notification.id);
    }, 5000);
  }

  private update(notifications: Notification[]) {
    this.notificationsClass?.update(notifications);
  }
}

export const notificator = new Notificator();
