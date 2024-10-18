import { redirect } from "next/navigation";
import Navbar from "~/components/Navbar";
import SideNav from "~/components/SideNav";
import { getApplicantFormByID } from "~/Controller/ApplicantFormController";
import { validateRequest } from "~/lib/auth";
import { RoleEnumsType } from "~/lib/schema";
import { authorizedRoles } from "~/util/filter-roles";
import { ApplicantForm } from "~/Validator/ApplicantForm";

export default async function layout({ children }: { children: React.ReactNode }) {
	const { user } = await validateRequest();

	if (!user) return redirect("/");
	else if (user?.role === "user") return redirect("/user");
	else if (user?.role === "admin") return redirect("/admin/users/manage-users");
	else if (!authorizedRoles.includes(user?.role)) {
		return redirect("/applicant");
	}

	return (
		<div className="flex justify-center">
			<SideNav role={user?.role} />
			<section className="container px-0">
				<Navbar
					avatarUrl={user?.avatarUrl as string}
					name={user?.name as string}
					department={user?.selected_department as string}
					office={user?.selected_office as string}
					role={user?.role as RoleEnumsType}
				/>
				{children}
			</section>
		</div>
	);
}
