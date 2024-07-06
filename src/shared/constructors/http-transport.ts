import { queryStringify } from "shared/lib";
import type { ValueOf } from "shared/types";

const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

type Options = {
  timeout?: number;
  method?: ValueOf<typeof METHODS>;
  headers?: Record<string, string>;
  query?: Record<string, string>;
  body?: unknown;
};

type HTTPMethod = (url: string, options?: Options) => Promise<XMLHttpRequest>;

export class HTTPTransport {
  get: HTTPMethod = async (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.GET });
  };

  post: HTTPMethod = async (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.POST });
  };

  put: HTTPMethod = async (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT });
  };

  delete: HTTPMethod = async (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  };

  request: HTTPMethod = async (url, options = {}) => {
    const { headers = {}, method, query, timeout = 10_000, body } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject("Не указан метод");

        return;
      }

      const xhr = new XMLHttpRequest();
      const queryString = queryStringify(query ?? {});

      xhr.open(method, `${url}${queryString}`);
      xhr.timeout = timeout;

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.addEventListener("load", () => {
        resolve(xhr);
      });

      xhr.addEventListener("abort", reject);
      xhr.addEventListener("error", reject);
      xhr.addEventListener("timeout", reject);

      xhr.send(body ? JSON.stringify(body) : undefined);
    });
  };
}
