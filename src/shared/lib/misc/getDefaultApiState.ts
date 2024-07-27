import type { ApiState } from "shared/types";

export const getDefaultApiState = <T>(initialData: T): ApiState<T> => {
  return {
    isLoading: false,
    isLoadedOnce: false,
    isError: false,
    data: initialData,
  };
};
