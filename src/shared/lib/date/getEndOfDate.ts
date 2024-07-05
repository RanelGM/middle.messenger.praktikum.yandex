export const getEndOfDate = (dateIncome: string | Date) => {
  const date = new Date(dateIncome);
  date.setHours(23, 59, 59, 999);

  return date;
};
