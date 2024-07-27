import { deepClone, getDefaultApiState } from "shared/lib";
import type {
  Chat,
  ChatMessage,
  ChatReducerAction,
  SetActiveChatAction,
  SetChatMessagesAction,
  SetChatUsersAction,
  SetChatsAction,
} from "./types";
import type { ChatUser } from "entities/user";
import type { ApiState } from "shared/types";

type ChatReducerState = {
  activeChat: Chat | null;
  chatMessages: Record<string, ChatMessage[]>;
  chats: ApiState<Chat[] | null>;
  chatUsers: ApiState<ChatUser[]>;
};

const initialState: ChatReducerState = {
  activeChat: null,
  chatMessages: {},
  chats: getDefaultApiState<Chat[] | null>(null),
  chatUsers: getDefaultApiState<ChatUser[]>([]),
};

class ChatReducer {
  private state = initialState;

  public getState() {
    return this.state;
  }

  public dispatch(action: ChatReducerAction) {
    if (action.type === "SET_ACTIVE_CHAT") {
      const updatedState = this.setActiveChat(action.payload);
      this.state = updatedState;

      return updatedState;
    }

    if (action.type === "SET_CHAT_MESSAGES") {
      const updatedState = this.setChatMessages(action.payload);
      this.state = updatedState;

      return updatedState;
    }

    if (action.type === "SET_CHATS") {
      const updatedState = this.setChats(action.payload);
      this.state = updatedState;

      return updatedState;
    }

    if (action.type === "SET_CHAT_USERS") {
      const updatedState = this.setChatUsers(action.payload);
      this.state = updatedState;

      return updatedState;
    }

    return this.getState();
  }

  private setChats(payload: SetChatsAction["payload"]) {
    return deepClone({ ...this.state, chats: { ...this.state.chats, ...payload } });
  }

  private setActiveChat(payload: SetActiveChatAction["payload"]) {
    const currentChats = this.getState().chats.data ?? [];
    const updatedChats = currentChats.map((chat) => (chat.id === payload?.id ? payload : chat));

    return deepClone({ ...this.state, chats: { ...this.state.chats, data: updatedChats }, activeChat: payload });
  }

  private setChatMessages(payload: SetChatMessagesAction["payload"]) {
    const { chatId, messages } = payload;

    const [newestMessage] = messages;
    const currentChats = this.getState().chats.data ?? [];

    const updatedChats = currentChats.map((chat) => {
      if (chat.id !== chatId || !newestMessage) {
        return chat;
      }

      const lastMessage = chat.lastMessage
        ? { ...chat.lastMessage, time: newestMessage.time, content: newestMessage.content }
        : undefined;

      return { ...chat, lastMessage };
    });

    return deepClone({
      ...this.state,
      chats: { ...this.state.chats, data: updatedChats },
      chatMessages: { ...this.state.chatMessages, [chatId]: messages },
    });
  }

  private setChatUsers(payload: SetChatUsersAction["payload"]) {
    return deepClone({ ...this.state, chatUsers: { ...this.state.chatUsers, ...payload } });
  }
}

export const chatReducer = new ChatReducer();
