import { format } from "date-fns";

export function formatDate(date: Date): string {
	return format(date, "dd-MM-yyyy");
}

export function formattedDateTime(dateTime: Date): string {
	return format(dateTime, "yyyy-MM-dd hh:mm a");
}
