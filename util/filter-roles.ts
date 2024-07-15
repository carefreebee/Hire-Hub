import { roleEnums } from "~/lib/schema";

export const authorizedRoles = roleEnums.enumValues.filter(
	(role) => role !== "user" && role !== "admin"
);
