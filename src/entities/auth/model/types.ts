import type { ApiState } from "shared/types";

export type ServerUser = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
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

export type SetUserAction = {
  type: "SET_USER";
  payload: Partial<ApiState<User | null>>;
};

export type AuthReducerAction = SetUserAction;
