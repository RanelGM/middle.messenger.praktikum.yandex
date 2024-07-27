import { Block } from "shared/constructors";
import { cn, zeroficate } from "shared/lib";
import { Icon } from "shared/ui";
import type { ChatMessage as ChatMessageType } from "entities/chat/model/types";
import styles from "./chat-message.module.scss";

type Props = {
  message: ChatMessageType;
  isMessageByUser: boolean;
};

export class ChatMessage extends Block {
  constructor(props: Props) {
    const { message, isMessageByUser } = props;
    const { time, content, isRead } = message;

    const date = new Date(time);
    const owner = isMessageByUser ? "currentUser" : "externalUser";

    super({
      text: content,
      isRead,
      className: cn(styles.message, styles[`message_owner-${owner}`]),
      time: `${zeroficate(date.getHours())}:${zeroficate(date.getMinutes())}`,
      Icon: new Icon({ name: isRead ? "TickDouble" : "TickSingle", size: "extra-small" }),
    });
  }

  render() {
    return /* HTML */ `
      <div class="{{className}}">
        <p>{{ text }}</p>
        <div class="${styles.timeWrapper} {{#if isRead}}${styles.timeWrapper_isRead}{{/if}}">
          {{{ Icon }}}
          <span class="${styles.time}">{{ time }}</span>
        </div>
      </div>
    `;
  }
}
