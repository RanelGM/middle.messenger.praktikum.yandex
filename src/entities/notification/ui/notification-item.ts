import { Block } from "shared/constructors";
import { cn } from "shared/lib";
import { Button, Icon } from "shared/ui";
import { notificator } from "../model/notificator";
import type { Notification } from "../model/types";
import styles from "./notification.module.scss";

type NotificationItemProps = {
  notification: Notification;
};

export class NotificationItem extends Block {
  constructor(props: NotificationItemProps) {
    const { notification } = props;

    super({
      ...notification,
      className: cn(styles.notificationItem, styles[`notificationItem__type-${notification.type}`]),
      CloseButton: new Button({
        Icon: new Icon({ name: "Cross", size: "extra-small" }),
        onClick: () => {
          notificator.close(notification.id);
        },
        size: "small",
        variant: "clear",
      }),
    });
  }

  render(): string {
    return /* HTML */ `
      <li class="{{className}}">
        <div class="${styles.titleWrapper}">
          {{#if title}}
          <h2>{{title}}</h2>
          {{/if}} {{{ CloseButton }}}
        </div>

        <p>{{ message }}</p>
      </li>
    `;
  }
}
