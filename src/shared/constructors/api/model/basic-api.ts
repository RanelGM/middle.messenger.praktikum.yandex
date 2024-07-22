import { checkIsServerError } from "../lib/checkIsServerError";
import { HTTPTransport } from "./http-transport";

export class BasicApi {
  api: HTTPTransport;
  baseUrl: string;

  constructor() {
    this.api = new HTTPTransport();
    this.baseUrl = "https://ya-praktikum.tech/api/v2";
  }

  public getApi(): HTTPTransport {
    return this.api;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public getUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  public handleError(error: unknown, statusCode?: number) {
    const notify = (message: string) => {
      console.log(message, statusCode);
    };

    if (typeof error === "string") {
      notify(error);

      return;
    }

    if (checkIsServerError(error)) {
      notify(`Произошла ошибка: ${error.reason}`);

      return;
    }

    notify("Произошла непредвиденная ошибка");
  }
}
