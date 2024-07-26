type PrimitiveRes = string | number | boolean;

export const getUnique = <T>(array: T[], accessorFn: (item: T) => PrimitiveRes): T[] => {
  const result: T[] = [];
  const map: Record<string, boolean> = {};

  array.forEach((item) => {
    const accessor = accessorFn(item);

    if (!map[accessor.toString()]) {
      result.push(item);
      map[accessor.toString()] = true;
    }
  });

  return result;
};
