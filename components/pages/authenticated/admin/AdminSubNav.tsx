"use client";

import { BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "~/components/ui/breadcrumb";

type AdminSubNavProps = {
	index: number;
	totalLinks: number;
	href: string;
	label: string;
};

export function AdminSubNav({ index, totalLinks, href, label }: AdminSubNavProps) {
	return (
		<>
			<BreadcrumbItem key={href}>
				<BreadcrumbLink href={href}>{label}</BreadcrumbLink>
			</BreadcrumbItem>
			{index !== totalLinks - 1 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
		</>
	);
}
