import type { ChatItemType } from "pages/chat-page/model/types";

export const getChatItemMock = (index: number): ChatItemType => {
  return {
    id: index.toString(),
    img: "/media/profile-avatar.svg",
    name: `Имя - ${index}`,
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    date: new Date(2024, 6, index).toISOString(),
    unreadCount: index,
  };
};
