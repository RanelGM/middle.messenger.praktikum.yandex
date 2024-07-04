/*
  1. Латиница или кириллица
  2. Первая буква должна быть заглавной (прочие - как заглавные, так и строчные)
  3. Без пробелов
  4. Без цифр
  5. Нет спецсимволов
*/
const Rule = new RegExp(/^[A-ZЁА-Я][A-Za-zЁА-яё-]*$/);

export const validateName = (value: string) => {
  const isValid = Rule.test(value);

  return {
    isValid,
    errorMessage: isValid ? "" : "Только буквы, первая буква - заглавная, без пробелов",
  };
};
