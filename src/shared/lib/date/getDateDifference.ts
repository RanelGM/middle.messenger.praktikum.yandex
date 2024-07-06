type Unit = "second" | "minute" | "hour" | "day" | "week";

export const getDateDifference = (date1: Date, date2: Date, unit: Unit): number => {
  const diffInMilliseconds = Math.abs(date1.getTime() - date2.getTime());

  switch (unit) {
    case "second": {
      return diffInMilliseconds / 1000;
    }
    case "minute": {
      return diffInMilliseconds / 60_000;
    }
    case "hour": {
      return diffInMilliseconds / 3_600_000;
    }
    case "day": {
      return diffInMilliseconds / 86_400_000;
    }
    case "week": {
      return diffInMilliseconds / 604_800_000;
    }
    default: {
      throw new Error("Передан некорректный unit");
    }
  }
};
