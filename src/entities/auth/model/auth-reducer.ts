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
      this.setUser(action.payload);
    }
  }

  private setUser(payload: SetUserAction["payload"]) {
    this.state = deepClone({ ...this.state, user: { ...this.state.user, ...payload } });
  }
}

export const authReducer = new AuthReducer();
