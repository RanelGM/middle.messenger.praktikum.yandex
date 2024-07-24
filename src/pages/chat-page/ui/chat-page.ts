import { chatApi } from "entities/chat";
import { Block } from "shared/constructors";
import { ChatCreate } from "./chat-create/chat-create";
import { ChatExpanded } from "./chat-expanded/chat-expanded";
import { getChatItemMock } from "./chat-item/getChatItemsMock";
import { ProfileLink } from "./profile-link/profile-link";
import { Search } from "./search/search";
import { Stub } from "./stub/stub";
import type { ChatItem } from "./chat-item/chat-item";
import type { ChatItemType } from "../model/types";
import styles from "./chat-page.module.scss";

const chatItemsMock = Array.from({ length: 8 }, (_value, index) => getChatItemMock(index));

export class ChatPage extends Block {
  activeChat: ChatItemType | null = null;

  constructor() {
    // const lists = chatItemsMock.map((chatItem) => {
    //   return new ChatItem({
    //     chatItem,
    //     onItemClick: () => {
    //       this._handleChatItemClick(chatItem);
    //     },
    //   });
    // });

    super({
      ChatCreate: new ChatCreate(),
      ProfileLink: new ProfileLink(),
      Search: new Search(),
      Stub: new Stub(),
      ChatExpanded: new ChatExpanded({ chatItem: chatItemsMock[0] as ChatItemType }),
      lists: [],
    });
  }

  componentDidMount(): void {
    void chatApi.getChats();
  }

  _handleChatItemClick(chatItem: ChatItemType) {
    if (chatItem.id === this.activeChat?.id || !this.lists.lists) {
      return;
    }

    this.setProps({ activeChat: chatItem });
    this.children.Stub?.hide();

    if (this.children.ChatExpanded) {
      (this.children.ChatExpanded as ChatExpanded).setProps({ chatItem });
    }

    (this.lists.lists as ChatItem[]).forEach((chat) => {
      if (chat.props.isActive) {
        chat.setProps({ isActive: false });
      }

      if (chat.props.id === chatItem.id) {
        chat.setProps({ isActive: true });
      }
    });
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
