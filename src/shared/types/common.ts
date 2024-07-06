export type ValueOf<T> = T[keyof T];

export type ValidationResult = {
  isValid: boolean;
  errorMessage: string;
};
