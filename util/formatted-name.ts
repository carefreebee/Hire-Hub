export function formattedName(role: string): string {
	if (!role) return "No assessor";

	return role.charAt(0).toUpperCase() + role.slice(1);
}

export function formattedNameAndRole(role: string, delimeter: "_" | "-"): string {
	if (!role) return "No assessor";

	return role
		.replaceAll(delimeter, " ")
		.toLowerCase()
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}
