"use client";

import { Slash } from "lucide-react";
import { Fragment } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

const AdminSubNavLinks = [
	{
		href: "/admin/users/manage-users",
		label: "Manage Users",
	},
	{
		href: "/admin/users/user-directory",
		label: "User Directory",
	},
];

export function AdminSubNav() {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				{AdminSubNavLinks.map((link, index) => (
					<Fragment key={link.href}>
						<BreadcrumbItem key={link.href}>
							<BreadcrumbLink href={link.href}>{link.label}</BreadcrumbLink>
						</BreadcrumbItem>
						{index !== AdminSubNavLinks.length - 1 && (
							<BreadcrumbSeparator>
								<Slash />
							</BreadcrumbSeparator>
						)}
					</Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
