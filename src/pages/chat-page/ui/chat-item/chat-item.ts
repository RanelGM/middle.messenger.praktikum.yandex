import { formatPreviewDate } from "pages/chat-page/lib/formatPreviewDate";
import { ApiRoutes, DefaultImageSrc } from "shared/constants";
import { Block } from "shared/constructors";
import { cn } from "shared/lib";
import type { Chat } from "entities/chat";
import styles from "./chat-item.module.scss";

type Props = {
  chat: Chat;
};

export class ChatItem extends Block {
  constructor(props: Props) {
    const { chat } = props;
    const { unreadCount, lastMessage, avatar, ...restChatItem } = chat;

    const dateTime = lastMessage ? formatPreviewDate(lastMessage.time) : undefined;
    const imgSrc = avatar ? `${ApiRoutes.BaseUrl}/${ApiRoutes.ResourcesUrl}${avatar}` : DefaultImageSrc;

    super({
      ...restChatItem,
      dateTime,
      imgSrc,
      count: unreadCount > 0 ? unreadCount : undefined,
      events: {
        click: () => {
          // onItemClick(chat);
        },
      },
    });
  }

  toggleActive(isActive: boolean) {
    if (isActive) {
      this.addAttributes({ class: cn(styles.chatItem, styles.chatItem_active) });
    } else {
      this.removeAttributes(["class"]);
      this.addAttributes({ class: cn(styles.chatItem) });
    }
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
              {{#if count}}<p class="${styles.count}">{{ count }}</p>{{/if}}
            </div>
          </div>
        </button>
      </li>
    `;
  }
}
