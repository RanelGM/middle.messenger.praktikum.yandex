import { Block } from "shared/constructors";
import { IconButton } from "shared/ui";
import type { Chat } from "entities/chat";
import styles from "./user-controls.module.scss";

type Props = {
  chat: Chat | null;
};

export class UserControls extends Block {
  constructor(props: Props) {
    const { chat } = props;

    super({
      chat,
      KebabButton: new IconButton({ name: "Kebab", size: "extra-small", hasBackground: true }),
    });
  }

  render() {
    return /* HTML */ `
      <div class="${styles.userControls}">
        <div class="${styles.imageWrapper}">
          <img class="${styles.image}" src="{{ chat.img }}" alt="Выбранный чат" width="34" height="34" />
          <p class="${styles.name}">{{ chat.name }}</p>
        </div>

        {{{ KebabButton }}}
      </div>
    `;
  }
}
