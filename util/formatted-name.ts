export function formattedName(role: string): string {
	if (!role) return "No assessor";

	return role
		.replaceAll("_", " ")
		.toLowerCase()
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export function formattedApplicantStatus(role: string): string {
	if (!role) return "No assessor";

	return role
		.replaceAll("-", " ")
		.toLowerCase()
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}
