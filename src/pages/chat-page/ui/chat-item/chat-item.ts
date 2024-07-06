import { formatPreviewDate } from "pages/chat-page/lib/formatPreviewDate";
import { Block } from "shared/constructors";
import { cn } from "shared/lib";
import type { ChatItemType } from "pages/chat-page/model/types";
import styles from "./chat-item.module.scss";

type Props = {
  chatItem: ChatItemType;
  onItemClick: (chatItem: ChatItemType) => void;
};

export class ChatItem extends Block {
  constructor(props: Props) {
    const { chatItem, onItemClick } = props;
    const { date, unreadCount, ...restChatItem } = chatItem;

    formatPreviewDate(date);
    super({
      ...restChatItem,
      count: unreadCount && unreadCount > 0 ? unreadCount : undefined,
      dateTime: formatPreviewDate(date),
      events: {
        click: () => {
          onItemClick(chatItem);
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
          <img class="${styles.image}" src="{{ img }}" alt="Изображение пользователя" width="47" height="47" />

          <div class="${styles.contentWrapper}">
            <div class="${styles.nameDateWrapper}">
              <h3 class="${styles.name}">{{ name }}<h3>
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
