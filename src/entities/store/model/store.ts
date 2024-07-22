import { authReducer } from "../../auth/model/auth-reducer";
import type { AuthReducerAction } from "../../auth/model/types";

class Store {
  private subscribes: ((state: typeof this.state) => unknown)[] = [];

  private reducers = {
    authReducer,
  };

  state = {
    authReducer: this.reducers.authReducer.getState(),
  };

  public getState() {
    return this.state;
  }

  public subscribe(mapStateToProps: (state: typeof this.state) => unknown) {
    this.subscribes.push(mapStateToProps);
    mapStateToProps(this.getState());
  }

  public dispatch(action: AuthReducerAction) {
    if (!("type" in action)) {
      return;
    }

    this.reducers.authReducer.dispatch(action);

    Object.entries(this.reducers).forEach(([key, reducer]) => {
      this.state[key as keyof typeof this.reducers] = reducer.getState();
    });

    this.subscribes.forEach((subscribe) => {
      subscribe(this.getState());
    });
  }
}

export const store = new Store();
