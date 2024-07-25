import { store } from "entities/store";
import { WSTransport } from "shared/constructors/api";
import type { Chat } from "../model/types";

export class ChatWs {
  static __instance: ChatWs | null;
  chats: Chat[] = [];
  sockets: Record<string, WSTransport> = {};

  constructor() {
    if (ChatWs.__instance) {
      return ChatWs.__instance;
    }

    ChatWs.__instance = this;
  }

  public initConnection(chat: Chat, token: string) {
    const user = store.getState().userReducer.user?.data;

    if (!user || this.sockets[chat.id]) {
      return;
    }

    const ws = new WSTransport({ url: `/chats/${user.id}/${chat.id}/${token}` });
    this.sockets[chat.id] = ws;
    ws.connect();
  }

  public closeConnections() {
    Object.values(this.sockets).forEach((socket) => {
      socket.close();
    });

    this.chats = [];
    this.sockets = {};
  }
}

export const chatWs = new ChatWs();
