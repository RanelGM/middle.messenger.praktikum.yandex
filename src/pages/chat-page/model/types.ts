export type ChatItemType = {
  id: string;
  img: string;
  name: string;
  message: string;
  date: string;
  unreadCount: number;
  isActive?: boolean;
};

export type ChatMessageType = {
  id: string;
  text: string;
  date: string;
  owner: "currentUser" | "externalUser";
};
