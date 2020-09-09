import {
  getYear,
  getMonth,
  getDaysInMonth,
  getDay,
  subDays,
  addDays,
  startOfMonth,
} from "date-fns";

export const generateMonthDatesArray = (date): Date[] => {
  const daysInMonth = getDaysInMonth(date);

  const firstMonthDate = startOfMonth(date);

  const monthsDates = Array.from({ length: daysInMonth }).map((_, idx) => {
    return new Date(getYear(date), getMonth(date), idx + 1);
  });

  const startOffset = getDay(firstMonthDate);

  const remainder =
    (daysInMonth + startOffset) % 7 === 0
      ? 0
      : 7 - ((daysInMonth + startOffset) % 7);

  const calendarRows = [
    ...Array.from({ length: startOffset }),
    ...monthsDates,
    ...Array.from({ length: remainder }),
  ].map((n, idx, arr) => {
    if (idx < startOffset) {
      return subDays(arr[startOffset] as Date, startOffset - idx) as Date;
    }

    if (idx > arr.length - remainder - 1) {
      return addDays(
        arr[arr.length - 1 - remainder] as Date,
        idx - arr.length + 1 + remainder
      ) as Date;
    }

    return n as Date;
  });

  return calendarRows;
};

export const chunk = <T extends unknown>(arr: T[], size: number) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
};

export * from "./baseline";
