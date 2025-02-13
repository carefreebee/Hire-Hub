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
import { COLORSEXT } from "./FirstPieChart";

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
	const [selectedOffice, setSelectedOffice] = useState(0);
	return (
		<>
			<div className="relative flex items-center justify-between px-10 pr-14">
				<h2 className="text-center text-lg">Applications by Office</h2>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant={"ghost"}
							className="flex items-center gap-2 text-slate-500"
						>
							Choose Office <ArrowDown size={15} />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="ml-[30%] flex max-h-56 w-fit flex-col gap-1 overflow-y-auto p-5 text-xs">
						{["All", ...dataLabel].map((office, index: number) => (
							<DropdownMenuItem
								key={index}
								className="my-0 flex w-fit flex-wrap break-words rounded-full p-0"
							>
								<Button
									variant={"ghost"}
									onClick={() => {
										setSelectedOffice(index);
									}}
									className={`${selectedOffice == index ? "bg-red-800 text-white hover:bg-red-800" : " "} my-0 flex w-fit flex-wrap break-words rounded-full p-3`}
								>
									{office}
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
								{selectedOffice - 1 === 0 ? total : data[selectedOffice].value}
							</tspan>
							<tspan x="50%" dy="30">
								applicants
							</tspan>
						</text>
					</RechartsPieChart>
				</ResponsiveContainer>
				{/* <ResponsiveContainer width="100%" height={500}>
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
				</ResponsiveContainer> */}
			</div>
		</>
	);
}
