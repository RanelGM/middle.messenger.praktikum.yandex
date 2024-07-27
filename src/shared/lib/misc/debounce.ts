type Timeout = ReturnType<typeof setTimeout>;

type Result<T extends unknown[]> = [(...args: T) => void, () => void];

export const debounce = <T extends unknown[]>(callback: (...args: T) => void, timeout = 300): Result<T> => {
  let timeoutId: Timeout | null = null;

  const resetDebounce = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  const startDebounce = (...args: T) => {
    resetDebounce();

    timeoutId = setTimeout(() => {
      callback(...args);
    }, timeout);
  };

  return [startDebounce, resetDebounce];
};
