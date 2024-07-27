import { connect, store } from "entities/store";
import { formatPreviewDate } from "pages/chat-page/lib/formatPreviewDate";
import { Block } from "shared/constructors";
import { getImageSrc, isEqual } from "shared/lib";
import type { Chat } from "entities/chat";
import type { StoreState } from "entities/store";
import type { BlockProps } from "shared/constructors";
import styles from "./chat-item.module.scss";

type Props = {
  chat: Chat;
};

type MapProps = {
  activeChat: Chat | null;
};

const mapStateToProps = (state: StoreState): MapProps => {
  return {
    activeChat: state.chatReducer.activeChat,
  };
};

class ChatItem extends Block {
  constructor(props: Props) {
    const { chat } = props;
    const { unreadCount, lastMessage, avatar, title } = chat;

    const dateTime = lastMessage ? formatPreviewDate(lastMessage.time) : undefined;
    const imgSrc = getImageSrc(avatar);
    const message = lastMessage?.content ?? "";

    super({
      isActive: false,
      title,
      imgSrc,
      dateTime,
      message,
      count: unreadCount > 0 ? unreadCount : undefined,
      events: {
        click: () => {
          store.dispatch({ type: "SET_ACTIVE_CHAT", payload: chat });
        },
      },
    });
  }

  componentDidUpdate(oldProps: BlockProps & MapProps, newProps: BlockProps & MapProps): boolean {
    if (!isEqual(oldProps.activeChat ?? {}, newProps.activeChat ?? {})) {
      this.setProps({ isActive: Boolean(newProps.activeChat?.id === this.props.id) });
    }

    return true;
  }

  render() {
    return /* HTML */ `
      <li class="${styles.chatItem} {{#if isActive}}${styles.chatItem_active}{{/if}}">
        <button class="${styles.button}">
          <img class="${styles.image}" src="{{ imgSrc }}" alt="Изображение пользователя" width="47" height="47" />

          <div class="${styles.contentWrapper}">
            <div class="${styles.nameDateWrapper}">
              <h3 class="${styles.title}">{{ title }}<h3>
              <p class="${styles.date}">{{ dateTime }}</p>
            </div>

            <div class="${styles.messageCountWrapper}">
              <p class="${styles.message}">{{ message }}</p>
            </div>
          </div>
        </button>
      </li>
    `;
  }
}

export const ChatItemWithStore = connect(mapStateToProps, ChatItem);
