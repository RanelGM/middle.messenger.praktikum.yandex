import { notificator } from "entities/notification";
import { ApiRoutes, AppRoutes } from "shared/constants";
import { router } from "shared/constructors/router";
import { isBetweenRange } from "shared/lib";
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
    const notify = (message: string) => {
      notificator.error(`${statusCode ? `${statusCode}. ` : ""}${message}`);
    };

    if (statusCode && isBetweenRange(statusCode, [500, 599])) {
      router.go(AppRoutes.ErrorServer);

      return;
    }

    if (typeof error === "string") {
      notify(error);

      return;
    }

    if (checkIsServerError(error)) {
      notify(`${error.reason}`);

      return;
    }

    notify("Произошла непредвиденная ошибка");
  }
}
