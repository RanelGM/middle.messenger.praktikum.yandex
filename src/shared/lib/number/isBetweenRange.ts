type Options = {
  shouldSwap?: boolean;
};

export const isBetweenRange = (value: number, range: [number, number], options: Options = {}) => {
  let [rangeFrom, rangeTo] = range;
  const { shouldSwap = true } = options;

  if (shouldSwap && rangeFrom > rangeTo) {
    rangeFrom = rangeTo;
    rangeTo = rangeFrom;
  }

  return value >= rangeFrom && value <= rangeTo;
};
