import { usePathname } from "next/navigation";
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "~/components/ui/breadcrumb";

type AdminSubNavProps = {
	index: number;
	totalLinks: number;
	href: string;
	label: string;
};

export function AdminSubNav({ index, totalLinks, href, label }: AdminSubNavProps) {
	const pathname = usePathname();

	return (
		<>
			<BreadcrumbItem key={href}>
				<BreadcrumbLink
					href={href}
					className={`${pathname === href ? "font-semibold text-[#7F0000]" : ""}`}
				>
					{label}
				</BreadcrumbLink>
			</BreadcrumbItem>
			{index !== totalLinks - 1 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
		</>
	);
}
