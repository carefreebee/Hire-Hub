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

export const COLORS = [
	"#0088FE",
	"#00C49F",
	"#FFBB28",
	"#FF8042",
	"#FF6384",
	"#4db4f9",
	"#FFCE56",
	"#4BC0C0",
];

const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const colleges = [
	"Office of the Vice President for Academic Affairs",
	"College of Management, Business, and Accountancy",
	"Office of the Expanded Tertiary Education Equivalency and Accreditation Program",
	"Department of Business Administration",
	"College of Engineering and Architecture",
	"Department of Mining Engineering",
	"College of Nursing and Allied Health Sciences",
	"College of Criminal Justice",
	"Department of Criminology",
	"Safety & Security Department",
	"College of Computer Studies",
	"Department of Computer Science",
	"College of Arts, Sciences, and Education",
	"Department of Languages, Literature, and Communication",
	"College of Engineering and Architecture",
	"Department of Mechanical Engineering",
	"Office of Admissions and Scholarships",
	"University Registrar's Office",
	"Learning Resource and Activity Center",
	"Department of Architecture",
	"High School Department",
	"Elementary Department",
	"Office of the Vice President for Academics",
	"Department of Civil Engineering",
	"Department of Electrical Engineering",
	"Department of Chemical Engineering",
	"Department of Industrial Engineering",
	"Department of Electronics Engineering",
	"Department of Computer Engineering",
	"Department of Information Technology",
	"Department of Accountancy",
	"Department of Hospitality and Tourism Management",
	"Department of Humanities and Behavioral Sciences",
	"Department of Engineering Mathematics, Physics and Chemistry",
	"Department of Physical Education",
	"Department of Pharmacy",
	"Senior High School Department",
];

const stages = [
	"screening",
	"initial_interview",
	"teaching_demo",
	"psychological_exam",
	"panel_interview",
	"recommendation_for_hiring",
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
	const dataAlll = useMemo(
		() =>
			Object.entries(alldata)
				.map(([stage, data]) => ({
					label: stage,
					value: (data as any).total,
				}))
				.filter((item) => item.value !== 0),
		[alldata]
	);
	const totalAlll = useMemo(
		() => dataAlll.reduce((a: any, b: any) => a + b.value, 0) || 0,
		[dataAlll]
	);

	const [dataAll, setDataAll] = useState(dataAlll);
	const [totalAll, setTotalAll] = useState(totalAlll);

	console.log(data, alldata);
	const payload = Object.entries(alldata).map(([stage, data], i) => ({
		value: stage
			.split("_")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" "),
		color: COLORS[i % COLORS.length],
	}));

	const [expanded, setExpanded] = useState(false);

	const toggleLegend = () => {
		setExpanded(!expanded);
	};
	const [selectedCollege, setSelectedCollege] = useState("All");

	useEffect(() => {
		if (selectedCollege === "All") {
			setDataAll(dataAlll);
			setTotalAll(totalAlll);
		} else {
			if (!data[selectedCollege]) {
				setDataAll([]);
				setTotalAll(0);
				return;
			}

			setDataAll(
				Object.entries(data[selectedCollege].stages)
					.map(([stage, data]) => ({
						label: stage,
						value: data,
					}))
					.filter((item) => item.value !== 0)
			);
			setTotalAll(data[selectedCollege].total);
		}
	}, [selectedCollege, data, dataAlll, totalAlll]);
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
							Filter by Department <ArrowDown size={15} />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="ml-[30%] flex max-h-56 w-fit flex-col gap-1 overflow-y-auto p-5 text-xs">
						{["All", ...colleges].map((college, index: number) => (
							<DropdownMenuItem
								key={index}
								className="my-0 flex w-fit flex-wrap break-words rounded-full p-0"
							>
								<Button
									variant={"ghost"}
									onClick={() => {
										setSelectedCollege(college);
									}}
									className={`${selectedCollege === college ? "bg-red-800 text-white hover:bg-red-800" : " "} my-0 flex w-fit flex-wrap break-words rounded-full p-3`}
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
						{payload.map((entry: any, index: number) => (
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
						{/* <button className="mb-2 text-sm text-blue-500" onClick={toggleLegend}>
							{expanded ? "Show Less" : "Show More"}
						</button> */}
					</div>
				</div>
				<ResponsiveContainer width={300} height={300}>
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
