import { chatApi } from "entities/chat";
import { connect, store } from "entities/store";
import { Block } from "shared/constructors";
import { isEqual } from "shared/lib";
import { Button, Icon } from "shared/ui";
import { UsersSearchList } from "../../users-search-list/users-search-list";
import type { Chat } from "entities/chat";
import type { StoreState } from "entities/store";
import type { ChatUser, User } from "entities/user";
import type { BlockProps } from "shared/constructors";
import type { ApiState } from "shared/types";

type Props = {
  isOpen: boolean;
};

type MapProps = {
  chatUsersApi: ApiState<ChatUser[]>;
  activeChat: Chat | null;
  checkedUsers: Record<string, User>;
};

const mapStateToProps = (state: StoreState): MapProps => {
  return {
    chatUsersApi: state.chatReducer.chatUsers,
    activeChat: state.chatReducer.activeChat,
    checkedUsers: state.userReducer.checkedUsers,
  };
};

class UserRemoveModal extends Block {
  checkedUsers: Record<string, User> = {};
  chat: Chat | null = null;

  constructor(props: Props) {
    const { isOpen } = props;

    super({
      isOpen,
      ButtonClose: new Button({
        text: "",
        size: "small",
        variant: "clear",
        Icon: new Icon({ name: "Cross", size: "small" }),
        className: "modalButtonClose",
        onClick: () => {
          this.handleClose();
        },
      }),
      UsersSearchList: new UsersSearchList({ users: [] }),
      ButtonSubmit: new Button({
        text: "Удалить",
        onClick: () => {
          this.handleSubmit();
        },
      }),
      lists: [],
    });
  }

  componentDidUpdate(oldProps: BlockProps & MapProps, newProps: BlockProps & MapProps): boolean {
    if (oldProps.chatUsersApi?.isLoading !== newProps.chatUsersApi?.isLoading) {
      this.children.ButtonSubmit?.setProps({ isLoading: Boolean(newProps.chatUsersApi?.isLoading) });
    }

    if (!isEqual(oldProps.activeChat ?? {}, newProps.activeChat ?? {})) {
      this.chat = newProps.activeChat;
    }

    if (!isEqual(oldProps.chatUsersApi?.data ?? {}, newProps.chatUsersApi?.data ?? {})) {
      const users = newProps.chatUsersApi?.data ?? [];

      this.children.UsersSearchList?.setProps({ users });
    }

    this.checkedUsers = newProps.checkedUsers ?? {};

    return true;
  }

  private handleClose() {
    this.setProps({ isOpen: false });
    store.dispatch({ type: "SET_CHECKED_USERS", payload: {} });
  }

  private handleSubmit() {
    const userIds = Object.values(this.checkedUsers).map((user) => user.id);
    const chat = this.chat;
    const onSuccess = this.handleClose.bind(this);

    if (!chat || userIds.length === 0) {
      return;
    }

    void chatApi.removeChatUsers(userIds, chat.id, onSuccess);
  }

  render(): string {
    return /* HTML */ `
      <div class="modal {{#unless isOpen}}visually-hidden{{/unless}}">
        <div class="modalContent">
          {{{ ButtonClose }}}
          <h2 class="modalTitle">Удалить пользователя</h2>
          {{{ UsersSearchList }}} {{{ ButtonSubmit }}}
        </div>
      </div>
    `;
  }
}

export const UserRemoveModalWithStore = connect(mapStateToProps, UserRemoveModal);
