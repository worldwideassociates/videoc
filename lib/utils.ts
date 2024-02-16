import { CalendarDate } from "@internationalized/date";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalize(obj: Record<string, any> | null | undefined) {
  if (obj === null || obj === undefined) return
  const result: Record<string, any> = {};
  for (const key in obj) {
    result[key] = obj[key] === null ? undefined : obj[key];
  }
  return result;
}


export const createCalendarDate = (date: Date | string) => {
  date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return new CalendarDate(year, month, day)
}
