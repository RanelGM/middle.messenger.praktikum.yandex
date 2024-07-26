import type { ChatServerUser, ChatUser } from "../../model/types";

const adaptChatUserFromServer = (user: ChatServerUser): ChatUser => {
  const { first_name: firstName, second_name: secondName, display_name: displayName, ...restUser } = user;

  return {
    firstName,
    secondName,
    displayName,
    ...restUser,
  };
};

export const adaptChatUsersFromServer = (users: ChatServerUser[]): ChatUser[] => {
  return users.map((user) => adaptChatUserFromServer(user));
};
