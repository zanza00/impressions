import { addHours, addDays, addMonths, toDate } from "date-fns";
import { TimeAmountAndType } from "./model";

export function addTime(
  from: number,
  { amount, type }: TimeAmountAndType,
): number {
  switch (type) {
    case "day":
      return addDays(toDate(from), amount).getTime();
    case "hour":
      return addHours(toDate(from), amount).getTime();
    case "month":
      return addMonths(toDate(from), amount).getTime();
  }
}
