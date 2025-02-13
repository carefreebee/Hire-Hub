"use client";

import { ArrowDown } from "lucide-react";
import { useState } from "react";
import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip } from "recharts";

import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

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

export const COLORSEXT = [
	"#FF5733",
	"#33FF57",
	"#5733FF",
	"#FF33F6",
	"#F6FF33",
	"#33F6FF", // Bold Colors
	"#C70039",
	"#900C3F",
	"#581845",
	"#FFC300",
	"#FF5733",
	"#C70039", // Warm tones
	"#8E44AD",
	"#3498DB",
	"#1ABC9C",
	"#16A085",
	"#F39C12",
	"#E74C3C", // Classic tones
	"#7D3C98",
	"#E67E22",
	"#F1C40F",
	"#27AE60",
	"#2C3E50",
	"#D35400", // Vivid colors
	"#2980B9",
	"#8E44AD",
	"#FF6F61",
	"#E74C3C",
	"#F39C12",
	"#2ECC71", // Contrasting Colors
	"#DFFF00",
	"#FFBF00",
	"#FF7F50",
	"#DB7093",
	"#F5DEB3",
	"#6A5ACD", // Soft Tones
	"#A52A2A",
	"#5F9EA0",
	"#FFD700",
	"#800080",
	"#FF6347",
	"#FF1493", // Bold and Pastel mix
	"#90EE90",
	"#BA55D3",
	"#FF4500",
	"#C71585",
	"#20B2AA",
	"#FFD700", // Bright and contrasting tones
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
	const dataLabel = data.map((d) => d.label);
	const total = data.reduce((a, b) => a + b.value, 0) || 0;
	const payload = data.map((d, i) => ({
		value: d.label,
		color: COLORSEXT[i % COLORSEXT.length],
	}));
	const [expanded, setExpanded] = useState(false);

	// Toggle the expansion/collapse
	const toggleLegend = () => {
		setExpanded(!expanded);
	};
	const [selectedCollege, setSelectedCollege] = useState(0);
	return (
		<>
			<div className="relative flex items-center justify-between px-10 pr-14">
				<h2 className="text-center text-lg">Applications by Department</h2>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant={"ghost"}
							className="flex items-center gap-2 text-slate-500"
						>
							Choose Department <ArrowDown size={15} />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="ml-[30%] flex max-h-56 w-fit flex-col gap-1 overflow-y-auto p-5 text-xs">
						{["All", ...dataLabel].map((college, index: number) => (
							<DropdownMenuItem
								key={index}
								className="my-0 flex w-fit flex-wrap break-words rounded-full p-0"
							>
								<Button
									variant={"ghost"}
									onClick={() => {
										setSelectedCollege(index);
									}}
									className={`${selectedCollege == index ? "bg-red-800 text-white hover:bg-red-800" : " "} my-0 flex w-fit flex-wrap break-words rounded-full p-3`}
								>
									{college}
								</Button>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div
				className={`${expanded ? "items-start" : "items-end"} flex justify-center bg-white`}
			>
				<div className="bg-gray-100 rounded-md p-2">
					{/* Toggle Button */}

					{/* Legend Items */}
					<div
						className={`${expanded ? "" : "max-h-68 flex flex-col gap-1 overflow-y-auto"}`}
					>
						{payload.slice(0, expanded ? payload.length : 4).map((entry, index) => (
							<div
								key={`item-${index}`}
								className="mb-1 flex w-60 items-center space-x-2 rounded bg-slate-100 p-2"
							>
								<div
									className="h-4 w-4 rounded"
									style={{ backgroundColor: entry.color }}
								></div>
								<span className="text-gray-800 w-56 flex-wrap text-xs">
									{entry.value}
								</span>
							</div>
						))}
						<button className="mb-2 text-sm text-blue-500" onClick={toggleLegend}>
							{expanded ? "Show Less" : "Show More"}
						</button>
					</div>
				</div>
				<ResponsiveContainer width="50%" height={300}>
					<RechartsPieChart>
						<Pie
							data={data}
							dataKey="value"
							nameKey="label"
							cx="50%"
							cy="50%"
							outerRadius={130}
							innerRadius={90}
							fill="#8884d8"
							paddingAngle={5}
						>
							{data.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORSEXT[index % COLORS.length]}
								/>
							))}
						</Pie>
						<Tooltip />
						<text
							x="50%" // Center of the hole
							y="50%" // Center of the hole
							textAnchor="middle"
							dominantBaseline="middle"
							fontSize="24"
							fontWeight="bold"
							fill="#333"
						>
							<tspan x="50%" dy="-20">
								{selectedCollege - 1 === 0 ? total : data[selectedCollege].value}
							</tspan>
							<tspan x="50%" dy="30">
								applicants
							</tspan>
						</text>
					</RechartsPieChart>
				</ResponsiveContainer>
			</div>
		</>
	);
}
