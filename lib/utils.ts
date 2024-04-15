import { Locale, i18n } from "@/i18n.config";
import { CalendarDate } from "@internationalized/date";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalize(obj: Record<string, any> | null | undefined) {
  if (obj === null || obj === undefined) return;
  const result: Record<string, any> = {};
  for (const key in obj) {
    result[key] = obj[key] === null ? undefined : obj[key];
  }
  return result;
}

export const createCalendarDate = (date: Date | string) => {
  date = new Date(date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return new CalendarDate(year, month, day);
};

export const getFormatedDate = (date: Date, locale: Locale) => {
  const dateLocale = locale === i18n.locales[1] ? "el" : locale;

  return new Intl.DateTimeFormat(dateLocale, {
    dateStyle: "full",
  }).format(date);
};

export const getFormatedTime = (date: Date, locale: Locale) => {
  const dateLocale = locale === i18n.locales[1] ? "el" : locale;

  return date.toLocaleTimeString(dateLocale, {
    hour: "2-digit",
    minute: "2-digit",
  });
};
