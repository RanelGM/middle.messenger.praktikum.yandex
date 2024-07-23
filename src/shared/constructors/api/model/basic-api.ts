import { checkIsServerError } from "../lib/checkIsServerError";
import { HTTPTransport } from "./http-transport";

const BaseUrl = "https://ya-praktikum.tech/api/v2";
export class BasicApi {
  api: HTTPTransport;

  constructor() {
    this.api = new HTTPTransport({ baseUrl: BaseUrl });
  }

  public getApi(): HTTPTransport {
    return this.api;
  }

  public handleError(error: unknown, statusCode?: number) {
    console.log("ERROR IS", error);

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
