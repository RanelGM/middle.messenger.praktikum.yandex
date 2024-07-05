import { Block } from "shared/constructors";
import { IconAsButton, Input } from "shared/ui";
import styles from "./chat-message-form.module.scss";

export class ChatMessageForm extends Block {
  constructor() {
    super({
      ButtonClip: new IconAsButton({ name: "Clip" }),
      Input: new Input({ name: "message", classNameWrapper: styles.inputWrapper }),
      ButtonSend: new IconAsButton({ name: "ArrowCircle", className: styles.buttonSend }),
    });
  }

  render() {
    return /* HTML */ `
      <form class="${styles.chatMessageForm}">{{{ ButtonClip }}} {{{ Input }}} {{{ ButtonSend }}}</form>
    `;
  }
}
