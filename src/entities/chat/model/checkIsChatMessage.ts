import type { ServerChatMessage } from "./types";

export const checkIsChatMessage = (data: unknown): data is ServerChatMessage[] => {
  return (
    Array.isArray(data) &&
    (data.length === 0 ||
      data.some((item) => {
        if (!item || typeof item !== "object") {
          return false;
        }

        return (item as Record<string, unknown>).type === "message";
      }))
  );
};
