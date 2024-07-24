"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "~/components/ui/chart";
import { YearPicker } from "../../year-picker";

type ChartProps = {
	chartData: ChartDataProps[];
};

type ChartDataProps = {
	year: string;
	months: {
		month: string;
		applicants: number;
	}[];
};

const chartConfig = {
	month: {
		label: "Month",
		color: "#FAA916",
	},
	applicants: {
		label: "Applicants",
		color: "#FAA916",
	},
} satisfies ChartConfig;

export function Chart({ chartData }: ChartProps) {
	const defaultYear = 2024;
	const [year, setYear] = useState<number>(defaultYear);

	useEffect(() => {
		// Initialize year state to defaultYear
		setYear(defaultYear);
	}, []);

	// Filter chartData based on the selected year
	const filteredData = chartData.find((data) => data.year === year.toString());

	return (
		<div className="bg-white">
			<div className="px-10 py-5">
				<div className="flex justify-between">
					<p className="text-lg font-semibold">User Statistics</p>
					<YearPicker selectedYear={year} onYearSelect={setYear} />
				</div>
				<p className="pt-5 text-sm font-semibold">No. of Applicants</p>
			</div>
			<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
				<BarChart accessibilityLayer data={filteredData?.months || []}>
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
					<Bar dataKey="applicants" fill="var(--color-applicants)" radius={4} />
					<Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
				</BarChart>
			</ChartContainer>
		</div>
	);
}
