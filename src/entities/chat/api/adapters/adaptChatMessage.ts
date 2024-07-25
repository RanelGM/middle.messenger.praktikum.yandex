import type { ChatMessage, ServerChatMessage } from "../../model/types";

export const adaptChatMessageFromServer = (message: ServerChatMessage): ChatMessage => {
  const { is_read: isRead, user_id: userId, chat_id: chatId, ...restMessage } = message;

  return {
    isRead,
    userId,
    chatId,
    ...restMessage,
  };
};

export const adaptChatMessagesFromServer = (messages: ServerChatMessage[]): ChatMessage[] => {
  return messages.map((message) => adaptChatMessageFromServer(message));
};
