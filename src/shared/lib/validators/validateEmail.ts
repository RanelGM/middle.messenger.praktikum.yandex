/*
  1. Латиница
  2. Может включать цифры и спецсимволы вроде дефиса и подчёркивания
  3. Обязательно должна быть «собака» (@)
  4. Должна быть Точка после собаки, но перед точкой обязательно должны быть буквы
*/
const Rule = new RegExp(/^[\w%+.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,}$/);

export const validateEmail = (value: string) => {
  const isValid = Rule.test(value);

  return {
    isValid,
    errorMessage: isValid ? "" : "Введите в формате example@yandex.ru",
  };
};
