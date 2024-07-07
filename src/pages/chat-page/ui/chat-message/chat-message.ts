import { Block } from "shared/constructors";
import { cn, zeroficate } from "shared/lib";
import type { ChatMessageType } from "pages/chat-page/model/types";
import styles from "./chat-message.module.scss";

type Props = {
  message: ChatMessageType;
};

export class ChatMessage extends Block {
  constructor(props: Props) {
    const { message } = props;

    const date = new Date(message.date);

    super({
      message,
      className: cn(styles.message, styles[`message_owner-${message.owner}`]),
      time: `${zeroficate(date.getHours())}:${zeroficate(date.getMinutes())}`,
    });
  }

  render() {
    return /* HTML */ `
      <div class="{{className}}">
        <p>{{ message.text }}</p>
        <p class="${styles.time}">{{ time }}</p>
      </div>
    `;
  }
}
