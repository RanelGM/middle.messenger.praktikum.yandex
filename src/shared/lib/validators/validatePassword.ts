/*
  1. От 8 до 40 символов
  2. Обязательно хотя бы одна заглавная буква и цифра.
*/
const Rule = new RegExp(/^(?=.*[A-Z])(?=.*\d)[\dA-Za-z]{8,40}$/);

export const validatePassword = (value: string) => {
  const isValid = Rule.test(value);

  return {
    isValid,
    errorMessage: isValid ? "" : "От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
  };
};
