"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "~/components/ui/chart";

type ChartProps = {
	chartData: ChartDataProps[];
};

export type ChartDataProps = {
	month: string;
	users: number;
};

const chartConfig = {
	month: {
		label: "Month",
		color: "#FAA916",
	},
	users: {
		label: "Users",
		color: "#FAA916",
	},
} satisfies ChartConfig;

export function AdminChart({ chartData }: ChartProps) {
	const [year, setYear] = useState<number | undefined>();

	return (
		<div className="bg-white">
			<div className="flex justify-between">
				<p>User Statistics</p>
				<YearPicker selectedYear={year} onYearSelect={setYear} />
			</div>
			<p>No. of Users</p>
			<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
				<BarChart accessibilityLayer data={chartData}>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="month"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
						tickFormatter={(value) => value.slice(0, 3)}
					/>
					<ChartTooltip content={<ChartTooltipContent />} />
					<Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
					<Bar dataKey="users" fill="var(--color-users)" radius={4} />
					<Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
				</BarChart>
			</ChartContainer>
		</div>
	);
}

type YearPickerProps = {
	selectedYear: number | undefined;
	onYearSelect: (year: number) => void;
};

const years = Array.from({ length: 100 }, (_, i) => 1900 + i);

function YearPicker({ selectedYear, onYearSelect }: YearPickerProps) {
	return (
		<select
			value={selectedYear ?? ""}
			onChange={(e) => onYearSelect(Number(e.target.value))}
			className="w-52 p-2"
		>
			<option value="" disabled>
				Select a year
			</option>
			{years.map((year) => (
				<option key={year} value={year}>
					{year}
				</option>
			))}
		</select>
	);
}

// export function AdminChart({ chartData }: ChartProps) {
// 	const [year, setYear] = useState<number | undefined>();

// 	return (
// 		<div className="bg-white">
// 			<div className="flex justify-between">
// 				<p>User Statistics</p>
// 				<YearPicker selectedYear={year} onYearSelect={setYear} />
// 			</div>
// 			<p>No. of Users</p>
// 			<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
// 				<BarChart data={chartData}>
// 					<CartesianGrid vertical={false} />
// 					<XAxis
// 						dataKey="year"
// 						tickLine={false}
// 						tickMargin={10}
// 						axisLine={false}
// 						tickFormatter={(value) => value} // Display year as is
// 					/>
// 					<ChartTooltip content={<ChartTooltipContent />} />
// 					<Bar dataKey="users" fill="var(--color-users)" radius={4} />
// 				</BarChart>
// 			</ChartContainer>
// 		</div>
// 	);
// }
