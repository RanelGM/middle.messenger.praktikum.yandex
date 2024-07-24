export type ChatMessageType = {
  id: string;
  text: string;
  date: string;
  owner: "currentUser" | "externalUser";
};
