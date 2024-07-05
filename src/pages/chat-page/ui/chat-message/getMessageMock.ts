import type { ChatMessageType } from "pages/chat-page/model/types";

const randomInteger = (min: number, max: number) => {
  const rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
};

export const getMessageMock = (index: number): ChatMessageType => {
  return {
    id: index.toString(),
    text: `Сообщение № ${index}`,
    date: new Date().toISOString(),
    owner: randomInteger(0, 1) === 1 ? "currentUser" : "externalUser",
  };
};
