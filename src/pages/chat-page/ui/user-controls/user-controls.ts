import { connect } from "entities/store";
import { Block } from "shared/constructors";
import { getImageSrc, isEqual } from "shared/lib";
import { IconButton } from "shared/ui";
import type { Chat } from "entities/chat";
import type { StoreState } from "entities/store";
import type { BlockProps } from "shared/constructors";
import styles from "./user-controls.module.scss";

type Props = {
  chat: Chat | null;
};

type MapProps = {
  activeChat: Chat | null;
};

const mapStateToProps = (state: StoreState): MapProps => {
  return {
    activeChat: state.chatReducer.activeChat,
  };
};

class UserControls extends Block {
  constructor(props: Props) {
    const { chat } = props;

    super({
      chat,
      imageSrc: getImageSrc(null),
      KebabButton: new IconButton({ name: "Kebab", size: "extra-small", hasBackground: true }),
    });
  }

  componentDidUpdate(oldProps: BlockProps & MapProps, newProps: BlockProps & MapProps): boolean {
    if (!isEqual(oldProps.activeChat ?? {}, newProps.activeChat ?? {})) {
      this.setProps({ chat: newProps.activeChat, imageSrc: getImageSrc(newProps.activeChat?.avatar) });
    }

    return true;
  }

  render() {
    return /* HTML */ `
      <div class="${styles.userControls}">
        <div class="${styles.imageWrapper}">
          <img class="${styles.image}" src="{{ imageSrc }}" alt="Выбранный чат" width="34" height="34" />
          <p class="${styles.name}">{{ chat.title }}</p>
        </div>

        {{{ KebabButton }}}
      </div>
    `;
  }
}

export const UserControlsWithStore = connect(mapStateToProps, UserControls);
