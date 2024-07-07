import type { ValidationResult } from "shared/types";

/*
  1. От 3 до 20 символов
  2. Латиница, может содержать цифры, но не состоять из них
  3. Без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).
*/
const Rule = new RegExp(/^(?!\d+$)[\w-]{3,20}$/);

export const validateLogin = (value: string): ValidationResult => {
  const isValid = Rule.test(value);

  return {
    isValid,
    errorMessage: isValid
      ? ""
      : "от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)",
  };
};
