import moment from "moment";

export function formatDate(date: Date) {
	return moment(date).format("DD-MM-YYYY");
}

export function formattedDateTime(dateTime: Date) {
	return moment(dateTime).format("YYYY-MM-DD HH:mm A");
}
