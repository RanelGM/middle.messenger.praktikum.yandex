import { chatReducer } from "entities/chat/model/chat-reducer";
import { userReducer } from "../../user/model/user-reducer";
import type { ChatReducerAction } from "../../chat/model/types";
import type { UserReducerAction } from "../../user/model/types";

class Store {
  private subscribes: ((state: typeof this.state) => unknown)[] = [];

  private reducers = {
    userReducer: userReducer,
    chatReducer: chatReducer,
  };

  state = {
    userReducer: this.reducers.userReducer.getState(),
    chatReducer: this.reducers.chatReducer.getState(),
  };

  public getState() {
    return this.state;
  }

  public subscribe(mapStateToProps: (state: typeof this.state) => unknown) {
    this.subscribes.push(mapStateToProps);
    mapStateToProps(this.getState());
  }

  public dispatch(action: UserReducerAction | ChatReducerAction) {
    if (!("type" in action)) {
      return;
    }

    this.reducers.userReducer.dispatch(action as UserReducerAction);
    this.reducers.chatReducer.dispatch(action as ChatReducerAction);

    Object.entries(this.reducers).forEach(([key, reducer]) => {
      // @ts-expect-error: Поскольку это одно и то же entry, то state гарантированно будет определён в нужном reducer
      this.state[key] = reducer.getState();
    });

    this.subscribes.forEach((subscribe) => {
      subscribe(this.getState());
    });
  }
}

export const store = new Store();
