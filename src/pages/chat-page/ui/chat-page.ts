import { chatApi } from "entities/chat";
import { connect, store } from "entities/store";
import { Block } from "shared/constructors";
import { isEqual } from "shared/lib";
import { ChatCreate } from "./chat-create/chat-create";
import { ChatExpandedWithStore } from "./chat-expanded/chat-expanded";
import { ChatItemWithStore } from "./chat-item/chat-item";
import { ProfileLink } from "./profile-link/profile-link";
import { Search } from "./search/search";
import { Stub } from "./stub/stub";
import type { Chat } from "entities/chat";
import type { StoreState } from "entities/store";
import type { BlockProps } from "shared/constructors";
import type { ApiState } from "shared/types";
import styles from "./chat-page.module.scss";

type MapProps = {
  chatsApi: ApiState<Chat[] | null>;
  activeChat: Chat | null;
};

const mapStateToProps = (state: StoreState): MapProps => {
  return {
    chatsApi: state.chatReducer.chats,
    activeChat: state.chatReducer.activeChat,
  };
};

class ChatPage extends Block {
  isMounted = false;
  isConnected = false;

  constructor() {
    super({
      ChatCreate: new ChatCreate(),
      ProfileLink: new ProfileLink(),
      Search: new Search(),
      Stub: new Stub(),
      ChatExpanded: new ChatExpandedWithStore({ chat: null }),
      lists: [],
    });
  }

  componentDidUpdate(oldProps: BlockProps & MapProps, newProps: BlockProps & MapProps): boolean {
    if (!this.isMounted) {
      this.isMounted = true;
      void chatApi.getChats();
    }

    if (!isEqual(oldProps.chatsApi?.data ?? {}, newProps.chatsApi?.data ?? {})) {
      this.setLists({ lists: this.createChatItems(newProps.chatsApi.data ?? []) });
    }

    if (oldProps.activeChat?.id !== newProps.activeChat?.id) {
      const chat = newProps.activeChat;

      if (chat) {
        this.children.Stub?.hide();
        void chatApi.getChatUsers(chat.id);
      } else {
        this.children.Stub?.show();
        store.dispatch({ type: "SET_CHAT_USERS", payload: { data: [] } });
      }
    }

    return true;
  }

  private createChatItems(chats: Chat[]): Block[] {
    return chats.map((chat) => new ChatItemWithStore({ chat }));
  }

  override render() {
    return /* HTML */ `
      <main class="${styles.main}">
        <div class="${styles.sidebar}">
          <div class="${styles.sidebarHeader}">{{{ ChatCreate }}} {{{ Search }}}</div>
          <div>{{{ ProfileLink }}}</div>
          <ul class="${styles.chatList}">
            {{{ lists }}}
          </ul>
        </div>

        {{{ Stub }}} {{#if activeChat}} {{{ ChatExpanded }}} {{/if}}
      </main>
    `;
  }
}

export const ChatPageWithStore = connect<MapProps>(mapStateToProps, ChatPage);
