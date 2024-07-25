import type { ServerUser, User } from "../../model/types";

export const adaptUserFromServer = (user: ServerUser): User => {
  const { first_name: firstName, second_name: secondName, display_name: displayName, ...restUser } = user;

  return {
    firstName,
    secondName,
    displayName,
    ...restUser,
  };
};

export const adaptUsersFromServer = (users: ServerUser[]): User[] => {
  return users.map((user) => adaptUserFromServer(user));
};

export const adaptUserToServer = (user: User): ServerUser => {
  const { firstName, secondName, displayName, ...restUser } = user;

  return {
    first_name: firstName,
    second_name: secondName,
    display_name: displayName,
    ...restUser,
  };
};

export const adaptUserToChanges = (user: User) => {
  const { firstName, secondName, displayName, login, email, phone } = user;

  return {
    first_name: firstName,
    second_name: secondName,
    display_name: displayName,
    login,
    email,
    phone,
  };
};
