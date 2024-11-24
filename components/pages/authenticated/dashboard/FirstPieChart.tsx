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
	"#0088FE",
	"#00C49F",
	"#FFBB28",
	"#FF8042",
	"#FF6384",
	"#36A2EB",
	"#FFCE56",
	"#4BC0C0",
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
