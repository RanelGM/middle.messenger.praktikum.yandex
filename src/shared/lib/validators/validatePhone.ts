import type { ValidationResult } from "shared/types";

/*
  1. От 10 до 15 символов
  2. Состоит из цифр
  3. Может начинается с плюса
*/
const Rule = new RegExp(/^\+?\d{10,15}$/);

export const validatePhone = (value: string): ValidationResult => {
  const isValid = Rule.test(value);

  return {
    isValid,
    errorMessage: isValid ? "" : "От 10 до 15 символов, состоит из цифр, может начинается с плюса.",
  };
};
