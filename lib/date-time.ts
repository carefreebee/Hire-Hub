export function formattedDate(date: Date) {
	const readableDate = new Date(date).toLocaleString();
	const splitDate = readableDate.split(",");
	return splitDate[0];
}
