import { HeaderGroup, flexRender } from "@tanstack/react-table";
import React from "react";
import { TableHead, TableRow } from "~/components/ui/table";

interface TableHeaderProps {
	headerGroups: HeaderGroup<any>[];
}

export default function TableHeaderComponent({ headerGroups }: TableHeaderProps) {
	return (
		<>
			{headerGroups.map((headerGroup) => (
				<TableRow key={headerGroup.id}>
					{headerGroup.headers.map((header) => (
						<TableHead key={header.id}>
							{header.isPlaceholder
								? null
								: flexRender(header.column.columnDef.header, header.getContext())}
						</TableHead>
					))}
				</TableRow>
			))}
		</>
	);
};
