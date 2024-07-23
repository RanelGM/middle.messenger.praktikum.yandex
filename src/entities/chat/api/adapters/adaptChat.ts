import { adaptUserFromServer, adaptUserToServer } from "entities/user";
import type { Chat, ServerChat } from "../../model/types";

export const adaptChatFromServer = (chat: ServerChat): Chat => {
  const { created_by: createdBy, unread_count: unreadCount, last_message: lastMessage, ...restChat } = chat;
  const { user, ...restLastMessage } = lastMessage;

  const adaptedUser = adaptUserFromServer(user);

  return {
    createdBy,
    unreadCount,
    lastMessage: { user: adaptedUser, ...restLastMessage },
    ...restChat,
  };
};

export const adaptChatsFromServer = (chats: ServerChat[]): Chat[] => {
  return chats.map((chat) => adaptChatFromServer(chat));
};

export const adaptChatToServer = (chat: Chat): ServerChat => {
  const { createdBy, unreadCount, lastMessage, ...restChat } = chat;
  const { user, ...restLastMessage } = lastMessage;

  const adaptedUser = adaptUserToServer(user);

  return {
    created_by: createdBy,
    unread_count: unreadCount,
    last_message: { user: adaptedUser, ...restLastMessage },
    ...restChat,
  };
};
