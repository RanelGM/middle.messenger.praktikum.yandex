import { ApiRoutes } from "shared/constants";

type WSTransportProps = {
  url: string;
  pingTimeout?: number;
  onOpen?: (evt: Event) => void;
  onError?: (evt: Event) => void;
  onMessage?: (evt: MessageEvent) => void;
  onClose?: (evt: CloseEvent) => void;
};

const voidCallback = (evt: Event) => {
  return evt;
};

export class WSTransport {
  socket: WebSocket | null = null;
  url: string;
  pingTimeout: number;
  pingInterval?: ReturnType<typeof setInterval>;
  onOpen: (evt: Event) => void;
  onError: (evt: Event) => void;
  onMessage: (evt: MessageEvent) => void;
  onClose: (evt: CloseEvent) => void;

  constructor(props: WSTransportProps) {
    const {
      url,
      pingTimeout = 10_000,
      onOpen = voidCallback,
      onClose = voidCallback,
      onError = voidCallback,
      onMessage = voidCallback,
    } = props;

    this.url = `${ApiRoutes.SocketBaseUrl}${url}`;
    this.pingTimeout = pingTimeout;
    this.onOpen = onOpen;
    this.onClose = onClose;
    this.onError = onError;
    this.onMessage = onMessage;
  }

  public connect() {
    this.socket = new WebSocket(this.url);
    this.initEvents(this.socket);
    this.initPing();
  }

  public send(data: Record<string, string>) {
    this.socket?.send(JSON.stringify(data));
  }

  public close() {
    this.socket?.close();
    clearInterval(this.pingInterval);
  }

  private initEvents(socket: WebSocket) {
    socket.addEventListener("open", this.onOpen);
    socket.addEventListener("error", this.onError);
    socket.addEventListener("message", this.onMessage);
    socket.addEventListener("close", this.onClose);
  }

  private initPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: "ping" });
    }, this.pingTimeout);
  }
}
