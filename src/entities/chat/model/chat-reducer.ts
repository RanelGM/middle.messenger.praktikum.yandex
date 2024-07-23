import { deepClone, getDefaultApiState } from "shared/lib";
import type { Chat, ChatReducerAction, SetChatsAction } from "./types";
import type { ApiState } from "shared/types";

type ChatReducerState = {
  chats: ApiState<Chat[] | null>;
};

const initialState: ChatReducerState = {
  chats: getDefaultApiState<Chat[] | null>(null),
};

class ChatReducer {
  private state = initialState;

  public getState() {
    return this.state;
  }

  public dispatch(action: ChatReducerAction) {
    if (action.type === "SET_CHATS") {
      const updatedState = this.setChats(action.payload);
      this.state = updatedState;

      return updatedState;
    }

    return this.getState();
  }

  private setChats(payload: SetChatsAction["payload"]) {
    return deepClone({ ...this.state, chats: { ...this.state.chats, ...payload } });
  }
}

export const chatReducer = new ChatReducer();
