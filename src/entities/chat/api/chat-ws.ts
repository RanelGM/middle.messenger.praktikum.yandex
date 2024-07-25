import { store } from "entities/store";
import { WSTransport } from "shared/constructors/api";
import { checkIsChatMessage } from "../model/checkIsChatMessage";
import { adaptChatMessagesFromServer } from "./adapters/adaptChatMessage";
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

    const ws = new WSTransport({
      url: `/chats/${user.id}/${chat.id}/${token}`,
      onOpen: () => {
        this.handleOpen(ws);
      },
      onMessage: (evt) => {
        this.handleMessage(evt, chat);
      },
    });

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

  private handleOpen(wsTransport: WSTransport) {
    wsTransport.send({ type: "get old", content: "0" });
  }

  private handleMessage(evt: MessageEvent, chat: Chat) {
    const data = JSON.parse(evt.data as string) as Record<string, string>;

    if ("type" in data && ["pong", "user connected"].includes(data.type)) {
      return;
    }

    if (!checkIsChatMessage(data)) {
      return;
    }

    const adaptedMessages = adaptChatMessagesFromServer(data);
    store.dispatch({ type: "SET_CHAT_MESSAGES", payload: { chatId: chat.id, messages: adaptedMessages } });
  }
}

export const chatWs = new ChatWs();
