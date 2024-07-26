import { store } from "entities/store";
import { adaptChatUsersFromServer } from "entities/user";
import { ApiRoutes } from "shared/constants";
import { BasicApi, checkIsServerError } from "shared/constructors";
import { getUnique } from "shared/lib";
import { adaptChatsFromServer } from "./adapters/adaptChat";
import { chatWs } from "./chat-ws";
import type { Chat, ChatToken, ServerChat } from "../model/types";
import type { ChatServerUser, ChatUser, User } from "entities/user";
import type { ApiState } from "shared/types";

class ChatApi extends BasicApi {
  async getChats(): Promise<void> {
    const setChatsApiState = (payload: Partial<ApiState<Chat[] | null>>) => {
      store.dispatch({ type: "SET_CHATS", payload });
    };

    try {
      setChatsApiState({ isLoading: true });

      const response = await this.api.get(ApiRoutes.Chats.getChats);
      const data = response.getData<ServerChat[]>();

      if (!data || !response.isOK || checkIsServerError(data)) {
        setChatsApiState({ isError: true });
        this.handleError(data, response.statusCode);

        return;
      }

      const adaptedChats = adaptChatsFromServer(data);

      setChatsApiState({ isError: false, data: adaptedChats });

      adaptedChats.forEach((chat) => {
        void this.getChatToken(chat);
      });
    } catch (error: unknown) {
      setChatsApiState({ isError: true });
      this.handleError(error);
    } finally {
      setChatsApiState({ isLoading: false });
    }
  }

  async createChat(title: string, onSuccess: () => void): Promise<void> {
    const setChatsApiState = (payload: Partial<ApiState<Chat[] | null>>) => {
      store.dispatch({ type: "SET_CHATS", payload });
    };

    try {
      setChatsApiState({ isLoading: true });

      const response = await this.api.post(ApiRoutes.Chats.createChat, {
        body: { title },
      });
      const data = response.getData();

      if (!response.isOK || checkIsServerError(data)) {
        setChatsApiState({ isError: true });
        this.handleError(data, response.statusCode);

        return;
      }

      onSuccess();
      void this.getChats();
    } catch (error: unknown) {
      setChatsApiState({ isError: true });
      this.handleError(error);
    } finally {
      setChatsApiState({ isLoading: false });
    }
  }

  async removeChat(chat: Chat, onSuccess: () => void): Promise<void> {
    const setChatsApiState = (payload: Partial<ApiState<Chat[] | null>>) => {
      store.dispatch({ type: "SET_CHATS", payload });
    };

    try {
      setChatsApiState({ isLoading: true });

      const response = await this.api.delete(ApiRoutes.Chats.createChat, {
        body: { chatId: chat.id },
      });
      const data = response.getData();

      if (!response.isOK || checkIsServerError(data)) {
        setChatsApiState({ isError: true });
        this.handleError(data, response.statusCode);

        return;
      }

      const currentChats = store.getState().chatReducer.chats.data ?? [];
      const updatedChats = currentChats.filter((currentChat) => currentChat.id !== chat.id);

      onSuccess();
      setChatsApiState({ data: updatedChats, isError: false });
    } catch (error: unknown) {
      setChatsApiState({ isError: true });
      this.handleError(error);
    } finally {
      setChatsApiState({ isLoading: false });
    }
  }

  async getChatToken(chat: Chat): Promise<void> {
    try {
      const response = await this.api.post(ApiRoutes.Chats.getToken(chat.id));
      const data = response.getData<ChatToken>();

      if (!data || !response.isOK || checkIsServerError(data)) {
        this.handleError(data, response.statusCode);

        return;
      }

      chatWs.initConnection(chat, data.token);
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  async getChatUsers(id: Chat["id"]): Promise<void> {
    const setApiState = (payload: Partial<ApiState<ChatUser[]>>) => {
      store.dispatch({ type: "SET_CHAT_USERS", payload });
    };

    try {
      setApiState({ isLoading: true });

      const response = await this.api.get(ApiRoutes.Chats.getUsers(id), {
        body: { id },
      });

      const data = response.getData<ChatServerUser[]>();

      if (!data || !response.isOK || checkIsServerError(data)) {
        setApiState({ isError: true });
        this.handleError(data, response.statusCode);

        return;
      }

      const adaptedData = adaptChatUsersFromServer(data);

      setApiState({ isError: false, data: adaptedData });
    } catch (error: unknown) {
      setApiState({ isError: true });
      this.handleError(error);
    } finally {
      setApiState({ isLoading: false });
    }
  }

  async addChatUsers(addingUserIds: User["id"][], chatId: Chat["id"], onSuccess: () => void): Promise<void> {
    const setApiState = (payload: Partial<ApiState<ChatUser[]>>) => {
      store.dispatch({ type: "SET_CHAT_USERS", payload });
    };

    const currentIds = store.getState().chatReducer.chatUsers.data.map((user) => user.id);
    const allIds = [...currentIds, ...addingUserIds];
    const uniqueIds = getUnique(allIds, (id) => id);

    try {
      setApiState({ isLoading: true });

      const response = await this.api.put(ApiRoutes.Chats.addUsers, {
        body: {
          users: uniqueIds,
          chatId,
        },
      });

      const data = response.getData<ChatServerUser[]>();

      if (!data || !response.isOK || checkIsServerError(data)) {
        setApiState({ isError: true });
        this.handleError(data, response.statusCode);

        return;
      }

      void this.getChatUsers(chatId);
      onSuccess();
    } catch (error: unknown) {
      setApiState({ isError: true });
      this.handleError(error);
    } finally {
      setApiState({ isLoading: false });
    }
  }
}

export const chatApi = new ChatApi();
