import { store } from "entities/store";
import { ApiRoutes } from "shared/constants";
import { BasicApi, checkIsServerError } from "shared/constructors";
import { adaptChatsFromServer } from "./adapters/adaptChat";
import type { Chat, ServerChat } from "../model/types";
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

      const adaptedUser = adaptChatsFromServer(data);

      setChatsApiState({ isError: false, data: adaptedUser });
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
}

export const chatApi = new ChatApi();