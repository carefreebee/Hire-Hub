import Image from "next/image";
import { Card } from "~/components/pages/authenticated/applicant/Card/CardComponent";
import { Chart } from "~/components/pages/authenticated/dashboard/Chart";
import FirstPieChart from "~/components/pages/authenticated/dashboard/FirstPieChart";
import SecondPieChart from "~/components/pages/authenticated/dashboard/SecondPieChart";
import { getAllApplicantForm } from "~/controller/ApplicantFormController";
import { getAllJobRequest } from "~/controller/JobRequestController";
import Banner from "~/public/images/banner.png";
import { ApplicantStages } from "~/types/types";

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

type UsersByMonthAndYear = {
	[key: string]: {
		[key: number]: number; // Where key is the year, and the value is an array of 12 numbers (one for each month)
	};
};

type AllApplications = {
	[key in string]: number;
};

export default async function DashboardPage() {
	const applicants = await getAllApplicantForm();
	const jobRequests = await getAllJobRequest();

	const applicantsByMonthAndYear: UsersByMonthAndYear = {};

	// Populate the applicantsByMonthAndYear object
	applicants.forEach((applicant) => {
		if (applicant.applied_date) {
			const appliedDate = new Date(applicant.applied_date);
			const year = appliedDate.getFullYear();
			const month = appliedDate.getMonth();

			// Ensure the year key exists
			if (!applicantsByMonthAndYear[year]) {
				applicantsByMonthAndYear[year] = Array(12).fill(0);
			}

			// Increment the count for the specific month of the year
			applicantsByMonthAndYear[year][month]++;
		}
	});

	// Convert the data to the format needed for the chart
	const chartData = Object.keys(applicantsByMonthAndYear).map((year) => {
		return {
			year,
			months: monthNames.map((month, index) => ({
				month,
				applicants: applicantsByMonthAndYear[+year][index],
			})),
		};
	});

	function areAllStagesPassed(stages: any) {
		return Object.values(stages).every((stage: any) => stage.status === "passed");
	}

	const results = applicants.map((applicant) => ({
		id: applicant.id,
		allStagesPassed: areAllStagesPassed(applicant.stages),
	}));

	// const newHire = results.filter((result) => result.allStagesPassed === true);

	const noNullApplicants = applicants.map((applicant) =>
		[...Object.keys(applicant?.stages as Object).filter((key) => key !== "undefined")].pop()
	);

	const passedApplicants = applicants
		.map(
			(applicant, index) =>
				applicant?.stages?.[noNullApplicants[index] as keyof ApplicantStages]?.status ==
				"passed"
		)
		.filter(Boolean);


	const departmentApplications = applicants.reduce((acc, applicant) => {
		const department = applicant.selected_department;
		if (department) {
			// Exclude null values
			if (!acc[department]) {
				acc[department] = 0;
			}
			acc[department]++;
		}
		return acc;
	}, {} as AllApplications);

	const departmentApplicationsData = Object.keys(departmentApplications).map(
		(department: any) => ({
			label: department,
			value: departmentApplications[department] ?? 0, // Provide a default value of 0 if undefined
		})
	);

	const officeApplications = applicants.reduce((acc, applicant) => {
		const office = applicant.selected_office;
		if (office) {
			// Exclude null values
			if (!acc[office]) {
				acc[office] = 0;
			}
			acc[office]++;
		}
		return acc;
	}, {} as AllApplications);

	const officeApplicationsData = Object.keys(officeApplications).map((office: any) => ({
		label: office,
		value: officeApplications[office] ?? 0, // Provide a default value of 0 if undefined
	}));

	return (
		<section>
			<header className="relative h-[94px]">
				<Image src={Banner} alt="Banner png" fill quality={100} />
			</header>
			<div className="px-8">
				<div className="flex gap-5">
					<DisplayCard
						svg={<ApplicantSvg />}
						count={applicants.length}
						label="Applicants"
					/>
					<DisplayCard svg={<VacantPositions />} count={0} label="Vacant Positions" />
					<DisplayCard
						svg={<JobRequests />}
						count={jobRequests.length}
						label="Job Requests"
					/>
					<DisplayCard svg={<NewHires />} count={newHire.length} label="New Hires" />
				</div>
				<div className="mt-8 flex gap-5">
					<div className="w-1/2">
						<h2 className="text-center">Applications by Department</h2>
						<FirstPieChart data={departmentApplicationsData} />
					</div>
					<div className="w-1/2">
						<h2 className="text-center">Applications by Office</h2>
						<SecondPieChart data={officeApplicationsData} />
					</div>
				</div>
				<Card>
					<Chart chartData={chartData} />
				</Card>
			</div>
		</section>
	);
}

type DisplayCardProps = {
	svg: React.ReactNode;
	count: number;
	label: string;
};

function DisplayCard({ svg, count, label }: DisplayCardProps) {
	return (
		<Card className="mb-0 flex-1">
			<div className="flex h-[116px] items-center gap-3 pl-8">
				{svg}
				<div className="flex flex-col justify-center">
					<b>{count}</b>
					<p className="text-sm">{label}</p>
				</div>
			</div>
		</Card>
	);
}

function ApplicantSvg() {
	return (
		<svg
			width="50"
			height="50"
			viewBox="0 0 60 60"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect opacity="0.1" width="60" height="60" rx="30" fill="#5B93FF" />
			<path
				d="M27.5 21.6667C25.3167 21.6667 23.5417 23.4417 23.5417 25.625C23.5417 27.7667 25.2167 29.5 27.4 29.575C27.4667 29.5667 27.5333 29.5667 27.5833 29.575C27.6 29.575 27.6083 29.575 27.625 29.575C27.6333 29.575 27.6333 29.575 27.6417 29.575C29.775 29.5 31.45 27.7667 31.4583 25.625C31.4583 23.4417 29.6833 21.6667 27.5 21.6667Z"
				fill="#407BFF"
			/>
			<path
				d="M31.7333 31.7917C29.4083 30.2417 25.6167 30.2417 23.275 31.7917C22.2167 32.5 21.6333 33.4583 21.6333 34.4833C21.6333 35.5083 22.2167 36.4583 23.2667 37.1583C24.4333 37.9417 25.9667 38.3333 27.5 38.3333C29.0333 38.3333 30.5667 37.9417 31.7333 37.1583C32.7833 36.45 33.3667 35.5 33.3667 34.4667C33.3583 33.4417 32.7833 32.4917 31.7333 31.7917Z"
				fill="#407BFF"
			/>
			<path
				d="M36.6583 26.1166C36.7917 27.7333 35.6417 29.15 34.05 29.3416C34.0417 29.3416 34.0417 29.3416 34.0333 29.3416H34.0083C33.9583 29.3416 33.9083 29.3416 33.8667 29.3583C33.0583 29.4 32.3167 29.1416 31.7583 28.6666C32.6167 27.9 33.1083 26.75 33.0083 25.5C32.95 24.825 32.7167 24.2083 32.3667 23.6833C32.6833 23.525 33.05 23.425 33.425 23.3916C35.0583 23.25 36.5167 24.4666 36.6583 26.1166Z"
				fill="#407BFF"
			/>
			<path
				d="M38.325 33.825C38.2583 34.6333 37.7417 35.3333 36.875 35.8083C36.0417 36.2667 34.9917 36.4833 33.95 36.4583C34.55 35.9167 34.9 35.2417 34.9667 34.525C35.05 33.4917 34.5583 32.5 33.575 31.7083C33.0167 31.2667 32.3667 30.9167 31.6583 30.6583C33.5 30.125 35.8167 30.4833 37.2417 31.6333C38.0083 32.25 38.4 33.025 38.325 33.825Z"
				fill="#407BFF"
			/>
		</svg>
	);
}

function VacantPositions() {
	return (
		<svg
			width="50"
			height="50"
			viewBox="0 0 60 60"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect opacity="0.2" width="60" height="60" rx="30" fill="#FFD66B" />
			<path
				d="M27.5 21.6667C25.3167 21.6667 23.5417 23.4417 23.5417 25.625C23.5417 27.7667 25.2167 29.5 27.4 29.575C27.4667 29.5667 27.5333 29.5667 27.5833 29.575C27.6 29.575 27.6083 29.575 27.625 29.575C27.6333 29.575 27.6333 29.575 27.6417 29.575C29.775 29.5 31.45 27.7667 31.4583 25.625C31.4583 23.4417 29.6833 21.6667 27.5 21.6667Z"
				fill="#FFC568"
			/>
			<path
				d="M31.7333 31.7917C29.4083 30.2417 25.6167 30.2417 23.275 31.7917C22.2167 32.5 21.6333 33.4583 21.6333 34.4833C21.6333 35.5083 22.2167 36.4583 23.2667 37.1583C24.4333 37.9417 25.9667 38.3333 27.5 38.3333C29.0333 38.3333 30.5667 37.9417 31.7333 37.1583C32.7833 36.45 33.3667 35.5 33.3667 34.4667C33.3583 33.4417 32.7833 32.4917 31.7333 31.7917Z"
				fill="#FFC568"
			/>
			<path
				d="M36.6583 26.1166C36.7917 27.7333 35.6417 29.15 34.05 29.3416C34.0417 29.3416 34.0417 29.3416 34.0333 29.3416H34.0083C33.9583 29.3416 33.9083 29.3416 33.8667 29.3583C33.0583 29.4 32.3167 29.1416 31.7583 28.6666C32.6167 27.9 33.1083 26.75 33.0083 25.5C32.95 24.825 32.7167 24.2083 32.3667 23.6833C32.6833 23.525 33.05 23.425 33.425 23.3916C35.0583 23.25 36.5167 24.4666 36.6583 26.1166Z"
				fill="#FFC568"
			/>
			<path
				d="M38.325 33.825C38.2583 34.6333 37.7417 35.3333 36.875 35.8083C36.0417 36.2667 34.9917 36.4833 33.95 36.4583C34.55 35.9167 34.9 35.2417 34.9667 34.525C35.05 33.4917 34.5583 32.5 33.575 31.7083C33.0167 31.2667 32.3667 30.9167 31.6583 30.6583C33.5 30.125 35.8167 30.4833 37.2417 31.6333C38.0083 32.25 38.4 33.025 38.325 33.825Z"
				fill="#FFC568"
			/>
		</svg>
	);
}

function JobRequests() {
	return (
		<svg
			width="50"
			height="50"
			viewBox="0 0 60 60"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect opacity="0.1" width="60" height="60" rx="30" fill="#FF8F6B" />
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M28.7034 21.519C28.0331 21.519 27.4628 21.9849 27.3027 22.6127H32.6854C32.5253 21.9849 31.9551 21.519 31.2847 21.519H28.7034ZM34.2071 22.6126H36.1881C38.2891 22.6126 40 24.3443 40 26.4709C40 26.4709 39.94 27.3711 39.92 28.6248C39.918 28.724 39.8699 28.8212 39.7909 28.88C39.3097 29.2354 38.8694 29.5291 38.8294 29.5493C37.1686 30.6632 35.2386 31.447 33.1826 31.8369C33.0485 31.8632 32.9165 31.7934 32.8484 31.6739C32.2721 30.6754 31.1956 30.0253 29.995 30.0253C28.8024 30.0253 27.7159 30.6683 27.1226 31.6678C27.0535 31.7853 26.9235 31.8531 26.7904 31.8278C24.7514 31.4369 22.8214 30.6541 21.1706 29.5594L20.2101 28.8911C20.1301 28.8405 20.08 28.7493 20.08 28.6481C20.05 28.1316 20 26.4709 20 26.4709C20 24.3443 21.7109 22.6126 23.8119 22.6126H25.7829C25.973 21.1443 27.2036 20 28.7044 20H31.2856C32.7864 20 34.017 21.1443 34.2071 22.6126ZM39.6594 30.8153L39.6194 30.8356C37.5984 32.1925 35.1671 33.0938 32.6159 33.4685C32.2557 33.5191 31.8955 33.2862 31.7955 32.9216C31.5753 32.0913 30.865 31.5444 30.0146 31.5444H30.0046H29.9846C29.1341 31.5444 28.4238 32.0913 28.2037 32.9216C28.1036 33.2862 27.7434 33.5191 27.3833 33.4685C24.832 33.0938 22.4008 32.1925 20.3797 30.8356C20.3697 30.8254 20.2697 30.7647 20.1897 30.8153C20.0996 30.8659 20.0996 30.9875 20.0996 30.9875L20.1696 36.152C20.1696 38.2786 21.8705 40.0001 23.9715 40.0001H36.0176C38.1186 40.0001 39.8195 38.2786 39.8195 36.152L39.8995 30.9875C39.8995 30.9875 39.8995 30.8659 39.8095 30.8153C39.7594 30.7849 39.6994 30.7951 39.6594 30.8153ZM30.7449 35.0583C30.7449 35.4836 30.4148 35.8178 29.9946 35.8178C29.5844 35.8178 29.2442 35.4836 29.2442 35.0583V33.752C29.2442 33.3368 29.5844 32.9925 29.9946 32.9925C30.4148 32.9925 30.7449 33.3368 30.7449 33.752V35.0583Z"
				fill="#FFA8A8"
			/>
		</svg>
	);
}

function NewHires() {
	return (
		<svg
			width="50"
			height="50"
			viewBox="0 0 60 60"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect opacity="0.1" width="60" height="60" rx="30" fill="#605BFF" />
			<path
				d="M27.5 21.6667C25.3167 21.6667 23.5417 23.4417 23.5417 25.625C23.5417 27.7667 25.2167 29.5 27.4 29.575C27.4667 29.5667 27.5334 29.5667 27.5834 29.575C27.6 29.575 27.6084 29.575 27.625 29.575C27.6334 29.575 27.6334 29.575 27.6417 29.575C29.775 29.5 31.45 27.7667 31.4584 25.625C31.4584 23.4417 29.6834 21.6667 27.5 21.6667Z"
				fill="#7D79FF"
			/>
			<path
				d="M31.7334 31.7917C29.4084 30.2417 25.6167 30.2417 23.275 31.7917C22.2167 32.5 21.6334 33.4583 21.6334 34.4833C21.6334 35.5083 22.2167 36.4583 23.2667 37.1583C24.4334 37.9417 25.9667 38.3333 27.5 38.3333C29.0334 38.3333 30.5667 37.9417 31.7334 37.1583C32.7834 36.45 33.3667 35.5 33.3667 34.4667C33.3584 33.4417 32.7834 32.4917 31.7334 31.7917Z"
				fill="#7D79FF"
			/>
			<path
				d="M36.6584 26.1166C36.7917 27.7333 35.6417 29.15 34.05 29.3416C34.0417 29.3416 34.0417 29.3416 34.0334 29.3416H34.0084C33.9584 29.3416 33.9084 29.3416 33.8667 29.3583C33.0584 29.4 32.3167 29.1416 31.7584 28.6666C32.6167 27.9 33.1084 26.75 33.0084 25.5C32.95 24.825 32.7167 24.2083 32.3667 23.6833C32.6834 23.525 33.05 23.425 33.425 23.3916C35.0584 23.25 36.5167 24.4666 36.6584 26.1166Z"
				fill="#7D79FF"
			/>
			<path
				d="M38.325 33.825C38.2583 34.6333 37.7417 35.3333 36.875 35.8083C36.0417 36.2667 34.9917 36.4833 33.95 36.4583C34.55 35.9167 34.9 35.2417 34.9667 34.525C35.05 33.4917 34.5583 32.5 33.575 31.7083C33.0167 31.2667 32.3667 30.9167 31.6583 30.6583C33.5 30.125 35.8167 30.4833 37.2417 31.6333C38.0083 32.25 38.4 33.025 38.325 33.825Z"
				fill="#7D79FF"
			/>
		</svg>
	);
}
