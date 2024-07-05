import { Block } from "shared/constructors";
import { IconAsButton } from "shared/ui";
import type { ChatItemType } from "pages/chat-page/model/types";
import styles from "./user-controls.module.scss";

type Props = {
  chatItem: ChatItemType | null;
};

export class UserControls extends Block {
  constructor(props: Props) {
    const { chatItem } = props;

    super({
      chatItem,
      KebabButton: new IconAsButton({ name: "Kebab", size: "extra-small", hasBackground: true }),
    });
  }

  render() {
    return /* HTML */ `
      <div class="${styles.userControls}">
        <div class="${styles.imageWrapper}">
          <img class="${styles.image}" src="{{ chatItem.img }}" alt="Выбранный чат" width="34" height="34" />
          <p class="${styles.name}">{{ chatItem.name }}</p>
        </div>

        {{{ KebabButton }}}
      </div>
    `;
  }
}
