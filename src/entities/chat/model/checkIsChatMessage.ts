import type { ServerChatMessage } from "./types";

export const checkIsChatMessage = (data: unknown): data is ServerChatMessage => {
  return data !== null && typeof data === "object" && "type" in data && data.type === "message";
};

export const checkIsChatMessages = (data: unknown): data is ServerChatMessage[] => {
  return Array.isArray(data) && (data.length === 0 || data.some((item) => checkIsChatMessage(item)));
};
