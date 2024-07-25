import { connect } from "entities/store";
import { Block } from "shared/constructors";
import { getImageSrc, isEqual } from "shared/lib";
import { Button, Icon, IconButton } from "shared/ui";
import { ChatRemoveModalWithStore } from "../modals/chat-remove-modal/chat-remove-modal";
import { UserAddModalWithStore } from "../modals/user-add-modal/user-add-modal";
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

const KebabWrapperId = "user-controls-kebab-wrapper";

class UserControls extends Block {
  constructor(props: Props) {
    const { chat } = props;

    super({
      chat,
      imageSrc: getImageSrc(null),
      isKebabOpen: false,
      KebabButton: new IconButton({
        name: "Kebab",
        size: "extra-small",
        hasBackground: true,
        onClick: () => {
          this.toggleKebab();
        },
      }),
      KebabAddUserButton: new Button({
        text: "Добавить пользователя",
        Icon: new Icon({ name: "CirclePlus", size: "extra-small" }),
        className: styles.kebabButton,
        onClick: () => {
          this.handleAddUserBtnClick();
        },
      }),
      KebabRemoveUserButton: new Button({
        text: "Удалить пользователя",
        Icon: new Icon({ name: "CircleCross", size: "extra-small" }),
        className: styles.kebabButton,
        onClick: () => {
          this.handleRemoveUserBtnClick();
        },
      }),
      KebabRemoveChatButton: new Button({
        text: "Удалить чат",
        Icon: new Icon({ name: "CircleCross", size: "extra-small" }),
        className: styles.kebabButton,
        onClick: () => {
          this.handleRemoveChatBtnClick();
        },
      }),
      ModalUserAdd: new UserAddModalWithStore({ isOpen: false }),
      ModalRemoveChat: new ChatRemoveModalWithStore({ isOpen: false }),
    });
  }

  componentDidUpdate(oldProps: BlockProps & MapProps, newProps: BlockProps & MapProps): boolean {
    if (!isEqual(oldProps.activeChat ?? {}, newProps.activeChat ?? {})) {
      this.setProps({ chat: newProps.activeChat, imageSrc: getImageSrc(newProps.activeChat?.avatar) });
    }

    return !isEqual(oldProps, newProps);
  }

  private toggleKebab() {
    const shouldOpen = !this.props.isKebabOpen;

    const handleClickOutside = (evt: MouseEvent) => {
      const kebabWrapper = (evt.target as HTMLDivElement | null)?.closest(`#${KebabWrapperId}`);

      if (!kebabWrapper) {
        this.setProps({ isKebabOpen: false });
      }
    };

    this.setProps({ isKebabOpen: shouldOpen });

    if (shouldOpen) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }
  }

  private handleAddUserBtnClick() {
    this.children.ModalUserAdd?.setProps({ isOpen: true });
    this.toggleKebab();
  }

  private handleRemoveUserBtnClick() {
    //
  }

  private handleRemoveChatBtnClick() {
    this.children.ModalRemoveChat?.setProps({ isOpen: true });
    this.toggleKebab();
  }

  render() {
    return /* HTML */ `
      <div class="${styles.userControls}">
        <div class="${styles.imageWrapper}">
          <img class="${styles.image}" src="{{ imageSrc }}" alt="Выбранный чат" width="34" height="34" />
          <p class="${styles.name}">{{ chat.title }}</p>
        </div>

        <div id="${KebabWrapperId}" class="${styles.kebabWrapper}">
          {{{ KebabButton }}}

          <ul class="${styles.kebabList} {{#unless  isKebabOpen}} visually-hidden {{/unless}}">
            <li>{{{ KebabAddUserButton }}}</li>
            <li>{{{ KebabRemoveUserButton }}}</li>
            <li>{{{ KebabRemoveUserButton }}}</li>
          </ul>
        </div>

        {{{ ModalUserAdd }}} {{{ ModalRemoveChat }}}
      </div>
    `;
  }
}

export const UserControlsWithStore = connect(mapStateToProps, UserControls);
