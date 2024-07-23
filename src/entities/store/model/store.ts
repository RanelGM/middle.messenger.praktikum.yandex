import { userReducer } from "../../user/model/user-reducer";
import type { UserReducerAction } from "../../user/model/types";

class Store {
  private subscribes: ((state: typeof this.state) => unknown)[] = [];

  private reducers = {
    userReducer: userReducer,
  };

  state = {
    userReducer: this.reducers.userReducer.getState(),
  };

  public getState() {
    return this.state;
  }

  public subscribe(mapStateToProps: (state: typeof this.state) => unknown) {
    this.subscribes.push(mapStateToProps);
    mapStateToProps(this.getState());
  }

  public dispatch(action: UserReducerAction) {
    if (!("type" in action)) {
      return;
    }

    this.reducers.userReducer.dispatch(action);

    Object.entries(this.reducers).forEach(([key, reducer]) => {
      this.state[key as keyof typeof this.reducers] = reducer.getState();
    });

    this.subscribes.forEach((subscribe) => {
      subscribe(this.getState());
    });
  }
}

export const store = new Store();
