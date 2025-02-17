import { Suspense } from "react";
import { Spinner } from "~/components/ui/spinner";
import TypographyH4 from "~/components/ui/typography-h4";
import {
	getAllApplicantByDeptOrOffice,
	getAllApplicantForm,
} from "~/controller/ApplicantFormController";
import { validateRequest } from "~/lib/auth";
import { ApplicantSelect, RoleEnumsType } from "~/lib/schema";
import { DataTable } from "./data-table";

export default async function ApplicantPage() {
	const { user } = await validateRequest();

	const higherUps: RoleEnumsType[] = [
		"guidance_center_staff",
		"recruitment_officer",
		"hr_head",
		"vp_acad_affairs",
		"vp_administration",
		"univ_president",
	];

	let applicant: ApplicantSelect[] = [];

	if (higherUps.includes(user?.role as RoleEnumsType)) {
		applicant = await getAllApplicantForm();
	} else {
		applicant = await getAllApplicantByDeptOrOffice(
			user?.department_id as number,
			user?.office_id as number
		);
	}

	return (
		<section className="bg-slate-200/30 px-10 py-10">
			<TypographyH4 text="Applicant List" />
			<div className="container mx-auto px-10">
				<Suspense
					fallback={
						<div className="relative flex h-screen items-center justify-center">
							<div className="absolute top-1/3 -translate-y-1/4 transform">
								<Spinner size="lg" className="bg-red-500 dark:bg-red-700" />
								<span>Loading...</span>
							</div>
						</div>
					}
				>
					{/* <DataTable columns={columns} data={applicant} /> */}
					<DataTable data={applicant} />
				</Suspense>
			</div>
		</section>
	);
}
