import { deepClone, getDefaultApiState } from "shared/lib";
import type { AuthReducerAction, SetUserAction, User } from "./types";
import type { ApiState } from "shared/types";

type AuthReducerState = {
  user: ApiState<User | null>;
};

const initialState: AuthReducerState = {
  user: getDefaultApiState<User | null>(null),
};

class AuthReducer {
  private state = initialState;

  public getState() {
    return this.state;
  }

  public dispatch(action: AuthReducerAction) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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

export const authReducer = new AuthReducer();
