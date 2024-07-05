import { DayIndexShortMap, MonthIndexMap } from "shared/constants";
import { getBeginningOfDate, getDateDifference } from "shared/lib";

const zeroficate = (number: number): string => {
  return number < 10 ? `0${number}` : `${number}`;
};

export const formatPreviewDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const dateBegin = getBeginningOfDate(isoDate);
  const todayBegin = getBeginningOfDate(new Date());

  const dayDiff = getDateDifference(dateBegin, todayBegin, "day");

  if (dayDiff === 0) {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${zeroficate(hours)}.${zeroficate(minutes)}`;
  }

  if (dayDiff <= 7) {
    return DayIndexShortMap[date.getDay() as keyof typeof DayIndexShortMap].toString();
  }

  return `${date.getDate()} ${MonthIndexMap.Genitive[date.getMonth() as keyof (typeof MonthIndexMap)["Genitive"]]} ${date.getFullYear()}`;
};
