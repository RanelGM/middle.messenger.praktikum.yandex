import { isFalsy } from "./isFalsy";

export const isTruthy = (value: unknown): boolean => {
  return !isFalsy(value);
};
