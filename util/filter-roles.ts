import { roleEnums, RoleEnumsType } from "~/lib/schema";

export const authorizedRoles = roleEnums.enumValues.filter(
	(role) => role !== "user" && role !== "admin"
) as RoleEnumsType[];
