import type { ServerUser, User } from "entities/user";
import type { ApiState } from "shared/types";

export type ServerChat = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message?: {
    user: ServerUser;
    time: string;
    content: string;
  };
};

export type Chat = {
  id: number;
  title: string;
  avatar: string;
  unreadCount: number;
  createdBy: number;
  lastMessage?: {
    user: User;
    time: string;
    content: string;
  };
};

export type ServerChatMessage = {
  id: number;
  type: string;
  time: string;
  content: string;
  file: string | null;
  is_read: boolean;
  user_id: number;
  chat_id: number;
};

export type ChatMessage = Omit<ServerChatMessage, "is_read" | "user_id" | "chat_id"> & {
  isRead: ServerChatMessage["is_read"];
  userId: ServerChatMessage["user_id"];
  chatId: ServerChatMessage["chat_id"];
};

export type ChatToken = {
  token: string;
};

export type SetChatsAction = {
  type: "SET_CHATS";
  payload: Partial<ApiState<Chat[] | null>>;
};

export type SetActiveChatAction = {
  type: "SET_ACTIVE_CHAT";
  payload: Chat | null;
};

export type SetChatMessagesAction = {
  type: "SET_CHAT_MESSAGES";
  payload: { chatId: number; messages: ChatMessage[] };
};

export type ChatReducerAction = SetChatsAction | SetActiveChatAction | SetChatMessagesAction;
