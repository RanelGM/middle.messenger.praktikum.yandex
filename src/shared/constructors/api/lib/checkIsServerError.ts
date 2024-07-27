import type { ServerError } from "../model/types";

export const checkIsServerError = (error: unknown): error is ServerError => {
  return typeof error === "object" && error !== null && "reason" in error;
};
