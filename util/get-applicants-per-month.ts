// import { ApplicantSelect } from "~/lib/schema";

// export function getApplicantsPerMonth(applicants: ApplicantSelect[]) {
// 	const counts = {};
// 	applicants.forEach((applicant) => {
// 		const monthYear = new Date(applicant?.applied_date).toLocaleString("default", {
// 			month: "long",
// 			year: "numeric",
// 		});
// 		if (counts[monthYear]) {
// 			counts[monthYear]++;
// 		} else {
// 			counts[monthYear] = 1;
// 		}
// 	});
// 	return Object.keys(counts).map((key) => ({ month: key, count: counts[key] }));
// };
