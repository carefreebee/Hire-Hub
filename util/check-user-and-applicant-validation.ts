import { ApplicantSelect, User } from "~/lib/schema";

type checkUserAndApplicantIfValidProps = {
	isUserDepartmentAllowed: boolean;
	isUserOfficeAllowed: boolean;
};

export function checkUserAndApplicantIfValid(
	applicant: ApplicantSelect,
	user: User
): checkUserAndApplicantIfValidProps {
	return {
		isUserDepartmentAllowed:
			applicant?.department_id !== null &&
			user?.department_id !== null &&
			applicant?.department_id === user?.department_id,
		isUserOfficeAllowed:
			applicant?.office_id !== null &&
			user?.office_id !== null &&
			applicant?.office_id === user?.office_id,
	};
}
