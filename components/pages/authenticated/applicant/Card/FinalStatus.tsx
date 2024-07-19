import { Button } from "~/components/ui/button";
import { formattedName } from "~/util/formatted-name";

export default function FinalStatus({ status }: { status: string }) {
	return (
		<Button
			variant={"outline"}
			disabled
			className={`${status === "passed" ? "text-[#039E38]" : "text-[#7F0000]"} h-auto w-32 py-1`}
		>
			{formattedName(status as string)}
		</Button>
	);
}
