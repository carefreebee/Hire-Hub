"use client";

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
	applicants: number;
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
	return (
		<div className="bg-white">
			<div className="flex justify-between">
				<p>Applicant Statistics</p>
				<p>should be year</p>
			</div>
			<p>No. of Applicants</p>
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
					<Bar dataKey="applicants" fill="var(--color-applicants)" radius={4} />
					<Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
				</BarChart>
			</ChartContainer>
		</div>
	);
}
