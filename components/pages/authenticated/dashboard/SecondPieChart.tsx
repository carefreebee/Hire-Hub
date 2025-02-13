"use client";

import { ArrowDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { COLORS } from "./FirstPieChart";

const offices = [
	"Executive Office",
	"Center for Communications, Creatives, and Marketing",
	"Office of the Management Information System",
	"Center for e-Learning, and Technology Education",
	"Human Resource Department",
	"Quality Assurance Office for Administration",
	"Student Success Office",
	"Finance and Accounting Office",
	"Office of the Property Custodian",
	"Athletics Office",
	"Office of the Community Extension Services",
	"Central Visayas Food Innovation Center",
	"Enrollment Technical Office / Information Systems Development",
	"Guidance Center",
	"Instructional Materials and Publications Office",
	"Innovation and Technology Support Office",
	"Medical & Dental Clinic",
	"Makerspace",
	"Multimedia Solutions and Documentation Office",
	"Networking and Linkages Office",
	"Research and Development Coordinating Office",
	"Alumni Affairs Office",
	"Technology Support Group",
	"Wildcat Innovation Labs",
	"Network of External University Support Services (NEXUSS)",
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

export default function FirstPieChart({ data, alldata }: any) {
	const dataAlll = useMemo(()=>Object.entries(alldata)
		.map(([stage, data]) => ({
			label: stage,
			value: (data as any).total,
		}))
		.filter((item) => item.value !== 0), [alldata]);
	const totalAlll = useMemo(()=>dataAlll.reduce((a: any, b: any) => a + b.value, 0) || 0, [dataAlll]);

	const [dataAll, setDataAll] = useState(dataAlll);
	const [totalAll, setTotalAll] = useState(totalAlll);
	const [selectedOffice, setSelectedOffice] = useState("All");

	const payload = Object.entries(alldata).map(([stage, data], i) => ({
		value: stage
			.split("_")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" "),
		color: COLORS[i % COLORS.length],
	}));

	useEffect(() => {
		if (selectedOffice === "All") {
			setDataAll(dataAlll);
			setTotalAll(totalAlll);
		} else {
			if (!data[selectedOffice]) {
				setDataAll([]);
				setTotalAll(0);
				return;
			}

			const dataByOffice = Object.entries(data[selectedOffice].stages)
				.map(([stage, data]) => ({
					label: stage,
					value: data,
				}))
				.filter((item) => item.value !== 0);

			setDataAll(dataByOffice);
			setTotalAll(data[selectedOffice].total);
		}
	}, [selectedOffice, data, dataAlll, totalAlll]);

	console.log(data, alldata);
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
							Filter by Office <ArrowDown size={15} />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="-ml-[30%] items-end flex max-h-56 w-fit flex-col gap-1 overflow-y-auto p-5 text-xs">
						{["All", ...offices].map((office, index: number) => (
							<DropdownMenuItem
								key={index}
								className="my-0 flex w-fit flex-wrap break-words rounded-full p-0"
							>
								<Button
									variant={"ghost"}
									onClick={() => {
										setSelectedOffice(office);
									}}
									className={`${selectedOffice === office ? "bg-red-800 text-white hover:bg-red-800" : " "} my-0 flex w-fit flex-wrap break-words rounded-full p-3`}
								>
									{office}
								</Button>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className={`flex items-end justify-center bg-white`}>
				<div className="bg-gray-100 rounded-md p-2">
					<div className={`max-h-68 flex flex-col gap-1 overflow-y-auto`}>
						{payload.map((entry, index) => (
							<div
								key={`item-${index}`}
								className="mb-1 flex w-fit items-center space-x-2 rounded bg-slate-100 p-2"
							>
								<div
									className="h-4 w-4 rounded"
									style={{ backgroundColor: entry.color }}
								></div>
								<span className="text-gray-800 w-fit flex-wrap text-xs">
									{entry.value}
								</span>
							</div>
						))}
					</div>
				</div>
				<ResponsiveContainer width="50%" height={300}>
					<RechartsPieChart>
						<Pie
							data={dataAll}
							dataKey="value"
							nameKey="label"
							cx="50%"
							cy="50%"
							outerRadius={130}
							innerRadius={90}
							fill="#8884d8"
							paddingAngle={5}
						>
							{dataAll?.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
								{totalAll}
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
