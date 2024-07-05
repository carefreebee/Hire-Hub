import { ApplicantSelect, User } from "~/lib/schema";

type checkUserAndApplicantIfValidProps = {
	isUserDepartmentAllowed: boolean;
	isUserOfficeAllowed: boolean;
};

export function checkUserAndApplicantIfValid(
	applicant?: ApplicantSelect,
	user?: User
): checkUserAndApplicantIfValidProps {
	return {
		isUserDepartmentAllowed:
			applicant?.selected_department !== null &&
			user?.selected_department !== null &&
			applicant?.selected_department === user?.selected_department,
		isUserOfficeAllowed:
			applicant?.selected_office !== null &&
			user?.selected_office !== null &&
			applicant?.selected_office === user?.selected_office,
	};
}
