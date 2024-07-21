export default function CheckedStatus({ status }: { status: "passed" | "in-progress" }) {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="mt-1"
		>
			<circle cx="8" cy="8" r="8" fill={`${status === "passed" ? "#7F0000" : "#ffd4d4"}`} />
			<circle cx="8.00002" cy="8.00002" r="3.07692" fill="white" />
		</svg>
	);
}
