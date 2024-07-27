import { adaptUserFromServer, adaptUserToServer } from "entities/user";
import type { Chat, ServerChat } from "../../model/types";

export const adaptChatFromServer = (chat: ServerChat): Chat => {
  const { created_by: createdBy, unread_count: unreadCount, last_message: lastMessage, ...restChat } = chat;

  return {
    createdBy,
    unreadCount,
    lastMessage: lastMessage ? { ...lastMessage, user: adaptUserFromServer(lastMessage.user) } : undefined,
    ...restChat,
  };
};

export const adaptChatsFromServer = (chats: ServerChat[]): Chat[] => {
  return chats.map((chat) => adaptChatFromServer(chat));
};

export const adaptChatToServer = (chat: Chat): ServerChat => {
  const { createdBy, unreadCount, lastMessage, ...restChat } = chat;

  return {
    created_by: createdBy,
    unread_count: unreadCount,
    last_message: lastMessage ? { ...lastMessage, user: adaptUserToServer(lastMessage.user) } : undefined,
    ...restChat,
  };
};
