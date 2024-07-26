import { Block } from "shared/constructors";
import { NotificationItem } from "./notification-item";
import type { Notification } from "../model/types";
import styles from "./notification.module.scss";

export class Notifications extends Block {
  constructor() {
    super({
      isShow: false,
      lists: [],
    });
  }

  update(notifications: Notification[]) {
    const lists = notifications.map((notification) => new NotificationItem({ notification }));

    this.setLists({ lists });
  }

  render(): string {
    return /* HTML */ `
      <ul class="${styles.notificationsList}">
        {{{ lists }}}
      </ul>
    `;
  }
}
