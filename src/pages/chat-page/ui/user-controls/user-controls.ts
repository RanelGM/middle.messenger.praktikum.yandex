import { chatApi } from "entities/chat";
import { connect } from "entities/store";
import { Block } from "shared/constructors";
import { getImageSrc, isEqual } from "shared/lib";
import { Button, Icon, IconButton, ImageInput } from "shared/ui";
import { ChatRemoveModalWithStore } from "../modals/chat-remove-modal/chat-remove-modal";
import { UserAddModalWithStore } from "../modals/user-add-modal/user-add-modal";
import { UserRemoveModalWithStore } from "../modals/user-remove-modal/user-remove-modal";
import type { Chat } from "entities/chat";
import type { StoreState } from "entities/store";
import type { ChatUser } from "entities/user";
import type { BlockProps } from "shared/constructors";
import type { ApiState } from "shared/types";
import styles from "./user-controls.module.scss";

type Props = {
  chat: Chat | null;
};

type MapProps = {
  activeChat: Chat | null;
  chatUsersApi: ApiState<ChatUser[]>;
};

const mapStateToProps = (state: StoreState): MapProps => {
  return {
    activeChat: state.chatReducer.activeChat,
    chatUsersApi: state.chatReducer.chatUsers,
  };
};

const KebabWrapperId = "user-controls-kebab-wrapper";

class UserControls extends Block {
  chat: Chat | null;

  constructor(props: Props) {
    const { chat } = props;

    super({
      usersCount: 1,
      chat,
      imageSrc: getImageSrc(null),
      isKebabOpen: false,
      ImageInput: new ImageInput({
        imageSrc: "",
        imageClassName: styles.image,
        changeOverlayClassName: styles.imageOverlay,
        onChange: (file) => {
          this.handleInputChange(file);
        },
      }),
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
      ModalUserRemove: new UserRemoveModalWithStore({ isOpen: false }),
      ModalRemoveChat: new ChatRemoveModalWithStore({ isOpen: false }),
    });

    this.chat = chat;
  }

  componentDidUpdate(oldProps: BlockProps & MapProps, newProps: BlockProps & MapProps): boolean {
    if (!isEqual(oldProps.activeChat ?? {}, newProps.activeChat ?? {})) {
      this.setProps({ chat: newProps.activeChat });
      this.chat = newProps.activeChat;
      this.children.ImageInput?.setProps({ imageSrc: getImageSrc(newProps.activeChat?.avatar ?? "") });
    }

    if (!isEqual(oldProps.chatUsersApi ?? {}, newProps.chatUsersApi ?? {})) {
      this.setProps({
        usersCount: newProps.chatUsersApi?.isLoading ? "загружаем..." : newProps.chatUsersApi.data?.length,
      });
    }

    return !isEqual(oldProps, newProps);
  }

  private handleInputChange(file: File) {
    const chatId = this.chat?.id;

    if (!chatId) {
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("chatId", chatId.toString());

    void chatApi.changeAvatar(formData);
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
    this.children.ModalUserRemove?.setProps({ isOpen: true });
    this.toggleKebab();
  }

  private handleRemoveChatBtnClick() {
    this.children.ModalRemoveChat?.setProps({ isOpen: true });
    this.toggleKebab();
  }

  render() {
    return /* HTML */ `
      <div class="${styles.userControls}">
        <div class="${styles.imageWrapper}">
          {{{ ImageInput }}}

          <div>
            <p class="${styles.name}">{{ chat.title }}</p>
            <p class="${styles.usersCount}">Пользователей: {{usersCount}}</p>
          </div>
        </div>

        <div id="${KebabWrapperId}" class="${styles.kebabWrapper}">
          {{{ KebabButton }}}

          <ul class="${styles.kebabList} {{#unless  isKebabOpen}} visually-hidden {{/unless}}">
            <li>{{{ KebabAddUserButton }}}</li>
            <li>{{{ KebabRemoveUserButton }}}</li>
            <li>{{{ KebabRemoveUserButton }}}</li>
          </ul>
        </div>

        {{{ ModalUserAdd }}} {{{ ModalUserRemove }}} {{{ ModalRemoveChat }}}
      </div>
    `;
  }
}

export const UserControlsWithStore = connect(mapStateToProps, UserControls);
