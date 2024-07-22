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
