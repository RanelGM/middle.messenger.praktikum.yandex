import { Block } from "shared/constructors";
import { ChatItem } from "./chat-item/chat-item";
import { getChatItemMock } from "./chat-item/getChatItemsMock";
import { ProfileLink } from "./profile-link/profile-link";
import { Search } from "./search/search";
import type { ChatItemType } from "../model/types";
import styles from "./chat-page.module.scss";

const chatItemsMock = Array.from({ length: 20 }, (_value, index) => getChatItemMock(index));

export class ChatPage extends Block {
  activeChat: ChatItemType | null = null;

  constructor() {
    const lists = chatItemsMock.map((chatItem) => {
      return new ChatItem({
        chatItem,
        onItemClick: () => {
          this._handleChatItemClick(chatItem);
        },
      });
    });

    super({
      ProfileLink: new ProfileLink(),
      Search: new Search(),
      lists,
    });
  }

  _handleChatItemClick(chatItem: ChatItemType) {
    if (chatItem.id === this.activeChat?.id || !this.lists.lists) {
      return;
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
          <div class="${styles.sidebarHeader}">{{{ ProfileLink }}} {{{ Search }}}</div>
          <ul class="${styles.chatList}">
            {{{ lists }}}
          </ul>
        </div>
      </main>
    `;
  }
}
