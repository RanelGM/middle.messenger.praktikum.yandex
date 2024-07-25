import { deepClone, getDefaultApiState } from "shared/lib";
import type {
  SetCheckedUsersAction,
  SetSearchUsersAction,
  SetUserAction,
  ToggleCheckedUsersAction,
  User,
  UserReducerAction,
} from "./types";
import type { ApiState } from "shared/types";

type UserReducerState = {
  user: ApiState<User | null>;
  searchUsers: ApiState<User[] | null>;
  checkedUsers: Record<string, User>;
};

const initialState: UserReducerState = {
  user: getDefaultApiState<User | null>(null),
  searchUsers: getDefaultApiState<User[] | null>(null),
  checkedUsers: {},
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

    if (action.type === "SET_SEARCH_USERS") {
      const updatedState = this.setSearchUsers(action.payload);
      this.state = updatedState;

      return updatedState;
    }

    if (action.type === "SET_CHECKED_USERS") {
      const updatedState = this.setCheckedUsers(action.payload);
      this.state = updatedState;

      return updatedState;
    }

    if (action.type === "TOGGLE_CHECKED_USERS") {
      const updatedState = this.toggleCheckedUsers(action.payload);
      this.state = updatedState;

      return updatedState;
    }

    return this.getState();
  }

  private setUser(payload: SetUserAction["payload"]) {
    return deepClone({ ...this.state, user: { ...this.state.user, ...payload } });
  }

  private setSearchUsers(payload: SetSearchUsersAction["payload"]) {
    return deepClone({ ...this.state, searchUsers: { ...this.state.searchUsers, ...payload } });
  }

  private setCheckedUsers(payload: SetCheckedUsersAction["payload"]) {
    return deepClone({ ...this.state, checkedUsers: payload });
  }

  private toggleCheckedUsers(payload: ToggleCheckedUsersAction["payload"]) {
    const user = payload;
    const checkedUsers = this.getState().checkedUsers;
    const isChecked = checkedUsers[user.id];
    let updatedUsers: typeof checkedUsers | null = null;

    if (isChecked) {
      const { [user.id]: _id, ...restChecked } = checkedUsers;

      updatedUsers = restChecked;
    } else {
      updatedUsers = { ...checkedUsers, [user.id]: user };
    }

    return deepClone({ ...this.state, checkedUsers: updatedUsers });
  }
}

export const userReducer = new UserReducer();
