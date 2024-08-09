import { format } from "date-fns";

export const dateToFormattedString = (value: Date | string): string => {
  if (!value) return "";

  return format(value, "dd.MM.yyyy");
};
