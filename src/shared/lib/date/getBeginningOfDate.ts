export const getBeginningOfDate = (dateIncome: string | Date) => {
  const date = new Date(dateIncome);
  date.setHours(0, 0, 0, 0);

  return date;
};
