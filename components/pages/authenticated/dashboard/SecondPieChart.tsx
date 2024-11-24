"use client";

import {
	Cell,
	Legend,
	Pie,
	PieChart as RechartsPieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";

const COLORS = [
	"#FF5733", // Red
	"#33FF57", // Green
	"#3357FF", // Blue
	"#FF33A1", // Pink
	"#FF8C33", // Orange
	"#33FFF5", // Cyan
	"#8C33FF", // Purple
	"#FF3333", // Dark Red
];

interface PieChartProps {
	data: { label: string; value: number }[];
}

const renderLegend = (props: any) => {
	const { payload } = props;
	return (
		<ul>
			{payload.map((entry: any, index: number) => (
				<li key={`item-${index}`} className="flex items-center">
					<div className="mr-2 h-3 w-3" style={{ backgroundColor: entry.color }}></div>
					{entry.value}: {entry.payload.value}
				</li>
			))}
		</ul>
	);
};

export default function FirstPieChart({ data }: PieChartProps) {
	return (
		<ResponsiveContainer width="100%" height={500}>
			<RechartsPieChart>
				<Pie
					data={data}
					dataKey="value"
					nameKey="label"
					cx="50%"
					cy="50%"
					outerRadius={150}
					fill="#8884d8"
					label
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Tooltip />
				<Legend content={renderLegend} />
			</RechartsPieChart>
		</ResponsiveContainer>
	);
}
