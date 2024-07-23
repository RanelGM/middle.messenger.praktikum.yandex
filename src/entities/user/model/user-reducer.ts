import { deepClone, getDefaultApiState } from "shared/lib";
import type { SetUserAction, User, UserReducerAction } from "./types";
import type { ApiState } from "shared/types";

type UserReducerState = {
  user: ApiState<User | null>;
};

const initialState: UserReducerState = {
  user: getDefaultApiState<User | null>(null),
};

class UserReducer {
  private state = initialState;

  public getState() {
    return this.state;
  }

  public dispatch(action: UserReducerAction) {
    if (action.type === "SET_USER") {
      const updatedState = this.setUser(action.payload);
      this.state = updatedState;

      return updatedState;
    }

    return this.getState();
  }

  private setUser(payload: SetUserAction["payload"]) {
    return deepClone({ ...this.state, user: { ...this.state.user, ...payload } });
  }
}

export const userReducer = new UserReducer();
