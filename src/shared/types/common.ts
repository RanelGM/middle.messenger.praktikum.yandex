export type ValueOf<T> = T[keyof T];

export type ValidationResult = {
  isValid: boolean;
  errorMessage: string;
};

export type ApiState<T> = {
  isLoading: boolean;
  isError: boolean;
  isLoadedOnce: boolean;
  data: T;
};
