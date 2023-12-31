import { DateTime } from "luxon";

export function DateToString(dateString: string) {
  const date = DateTime.fromISO(dateString);
  const today = DateTime.now().startOf("day");

  if (today <= date.startOf("day")) {
    // TODO: Fix this
    return date.toLocaleString({
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } else {
    return date.toLocaleString({
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
}
