"use client";

import { Cell, Legend, Pie, PieChart as RechartsPieChart, ResponsiveContainer } from "recharts";

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

export default function FirstPieChart({ data }: PieChartProps) {
	return (
		<ResponsiveContainer width="100%" height={400}>
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
					<Legend verticalAlign="top" height={36} />
				</Pie>
			</RechartsPieChart>
		</ResponsiveContainer>
	);
}
