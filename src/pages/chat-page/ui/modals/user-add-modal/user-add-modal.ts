import { connect, store } from "entities/store";
import { userApi } from "entities/user";
import { Block } from "shared/constructors";
import { debounce, isEqual } from "shared/lib";
import { Button, Icon, Input } from "shared/ui";
import { UsersSearchListWithStore } from "../../users-search-list/users-search-list";
import type { Chat } from "entities/chat";
import type { StoreState } from "entities/store";
import type { User } from "entities/user";
import type { BlockProps } from "shared/constructors";
import type { ApiState } from "shared/types";

type UserAddModalProps = {
  isOpen: boolean;
};

type MapProps = {
  activeChat: Chat | null;
  checkedUsers: Record<string, User>;
  searchUsersApi: ApiState<User[] | null>;
};

const mapStateToProps = (state: StoreState): MapProps => {
  return {
    activeChat: state.chatReducer.activeChat,
    checkedUsers: state.userReducer.checkedUsers,
    searchUsersApi: state.userReducer.searchUsers,
  };
};

class UserAddModal extends Block {
  checkedUsers: Record<string, User> = {};
  chat: Chat | null = null;

  constructor(props: UserAddModalProps) {
    const { isOpen } = props;
    const [startDebounce, resetDebounce] = debounce((value: string) => {
      this.handleInputChange(value);
    }, 800);

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
      Input: new Input({
        placeholder: "Введите логин пользователя",
        onInput: (evt) => {
          const value = evt.target.value;

          if (value) {
            startDebounce(value);
          } else {
            resetDebounce();
          }
        },
      }),
      UsersSearchList: new UsersSearchListWithStore({}),
      ButtonSubmit: new Button({
        text: "Добавить",
        onClick: () => {
          this.handleSubmit();
        },
      }),
      lists: [],
    });
  }

  componentDidUpdate(oldProps: BlockProps & MapProps, newProps: BlockProps & MapProps): boolean {
    if (oldProps.searchUsersApi?.isLoading !== newProps.searchUsersApi?.isLoading) {
      this.children.ButtonSubmit?.setProps({ isLoading: Boolean(newProps.searchUsersApi?.isLoading) });
    }

    if (!isEqual(oldProps.activeChat ?? {}, newProps.activeChat ?? {})) {
      this.chat = newProps.activeChat;
    }

    this.checkedUsers = newProps.checkedUsers ?? {};

    return true;
  }

  private handleClose() {
    this.setProps({ isOpen: false });
    this.children.Input?.setProps({ value: "" });
    store.dispatch({ type: "SET_CHECKED_USERS", payload: {} });
    store.dispatch({ type: "SET_SEARCH_USERS", payload: { data: null } });
  }

  private handleInputChange(value: string) {
    void userApi.searchUsers(value);
  }

  private handleSubmit() {
    // TODO: Добавить
  }

  render(): string {
    return /* HTML */ `
      <div class="modal {{#unless isOpen}}visually-hidden{{/unless}}">
        <div class="modalContent">
          {{{ ButtonClose }}}
          <h2 class="modalTitle">Добавить пользователя</h2>
          {{{ Input }}} {{{ UsersSearchList }}} {{{ ButtonSubmit }}}
        </div>
      </div>
    `;
  }
}

export const UserAddModalWithStore = connect(mapStateToProps, UserAddModal);
