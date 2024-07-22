import { authReducer } from "entities/auth";
import type { AuthReducerAction } from "entities/auth";

class Store {
  private subscribes: ((state: typeof this.state) => unknown)[] = [];

  private reducers = {
    authReducer,
  };

  private state = {
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

    this.subscribes.forEach((subscribe) => {
      subscribe(this.getState());
    });
  }
}

export const store = new Store();
