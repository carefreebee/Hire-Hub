"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "~/components/ui/chart";

const chartData = [
	{ month: "January", desktop: 186 },
	{ month: "February", desktop: 305 },
	{ month: "March", desktop: 237 },
	{ month: "April", desktop: 73 },
	{ month: "May", desktop: 209 },
	{ month: "June", desktop: 214 },
];

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
		color: "#2563eb",
	},
	applicants: {
		label: "Applicants",
		color: "#2563eb",
	},
} satisfies ChartConfig;

export function Chart({ chartData }: ChartProps) {
	return (
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
	);
}
