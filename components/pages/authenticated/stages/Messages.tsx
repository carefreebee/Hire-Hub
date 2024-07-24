import { CardContent } from "../applicant/Card/CardComponent";

export function StageStatus({ status }: { status: string }) {
	const inProgress = status === "in-progress";
	const isPassed = status === "passed";
	const isFailed = status === "failed";

	return (
		<CardContent className="mt-0 items-center justify-center font-semibold text-slate-500">
			{isPassed
				? "This applicant is done with this stage."
				: isFailed
					? "This applicant has failed this stage."
					: inProgress
						? "This applicant is in progress."
						: "This applicant has not yet reached this stage."}
		</CardContent>
	);
}

export function UploadSuccess() {
	return (
		<CardContent className="mt-0 h-52 flex-col items-center justify-center">
			<p className="text-xl font-medium">Success!</p>
			<div className="mt-2 flex flex-col items-center">
				<small className="text-[#4F4F4F]">
					Rating form has been submitted successfully, check
				</small>
				<small className="text-[#4F4F4F]">your documents to view file.</small>
			</div>
		</CardContent>
	);
}
