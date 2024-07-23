import { ApiRoutes } from "shared/constants";
import { checkIsServerError } from "../lib/checkIsServerError";
import { HTTPTransport } from "./http-transport";

export class BasicApi {
  api: HTTPTransport;
  baseUrl = "";

  constructor() {
    const baseUrl = ApiRoutes.BaseUrl;
    this.api = new HTTPTransport({ baseUrl });
    this.baseUrl = baseUrl;
  }

  public getApi(): HTTPTransport {
    return this.api;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public getResourcesPath(): string {
    return `${this.baseUrl}/${ApiRoutes.ResourcesUrl}`;
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
