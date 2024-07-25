import type { ApiState } from "shared/types";

export type ServerUser = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  phone: string;
  login: string;
  avatar: string | null;
  email: string;
};

export type User = Omit<ServerUser, "first_name" | "second_name" | "display_name"> & {
  firstName: ServerUser["first_name"];
  secondName: ServerUser["second_name"];
  displayName: ServerUser["display_name"];
};

export type SignIn = {
  login: string;
  password: string;
};

export type SignUp = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type PasswordUpdate = {
  oldPassword: string;
  newPassword: string;
};

export type SetUserAction = {
  type: "SET_USER";
  payload: Partial<ApiState<User | null>>;
};

export type SetSearchUsersAction = {
  type: "SET_SEARCH_USERS";
  payload: Partial<ApiState<User[] | null>>;
};

export type SetCheckedUsersAction = {
  type: "SET_CHECKED_USERS";
  payload: Record<string, User>;
};

export type ToggleCheckedUsersAction = {
  type: "TOGGLE_CHECKED_USERS";
  payload: User;
};

export type UserReducerAction = SetUserAction | SetSearchUsersAction | SetCheckedUsersAction | ToggleCheckedUsersAction;
