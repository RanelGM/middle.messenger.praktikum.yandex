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

export type SetChatsAction = {
  type: "SET_CHATS";
  payload: Partial<ApiState<Chat[] | null>>;
};

export type SetActiveChatAction = {
  type: "SET_ACTIVE_CHAT";
  payload: Chat | null;
};

export type ChatReducerAction = SetChatsAction | SetActiveChatAction;
