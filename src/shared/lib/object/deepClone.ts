export const deepClone = <T = unknown>(item: T): T => {
  if (item === null || typeof item !== "object" || item instanceof Date) {
    return item;
  }

  if (Array.isArray(item)) {
    const copy: ReturnType<typeof deepClone>[] = [];

    item.forEach((el) => {
      copy.push(deepClone(el));
    });

    return copy as T;
  }

  if (item instanceof Set) {
    const copy = new Set();

    item.forEach((el) => {
      copy.add(deepClone(el));
    });

    return copy as T;
  }

  if (item instanceof Map) {
    const copy = new Map();

    item.forEach((value, key) => {
      copy.set(key, deepClone(value));
    });

    return copy as T;
  }

  if (item instanceof Object) {
    const copy: Record<string, unknown> = {};

    Object.getOwnPropertySymbols(item).forEach((symbol) => {
      const key = symbol.toString();
      const value = item[key as keyof typeof item];

      copy[key] = deepClone(value);
    });

    Object.entries(item).forEach(([key, value]) => {
      copy[key] = deepClone(value);
    });

    return copy as T;
  }

  throw new Error(`Не удалось использовать deepClone на: ${item}`);
};
