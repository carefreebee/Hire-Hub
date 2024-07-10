import Link from "next/link";
import ArrowLeft from "../ui/arrow-left";

export default function Previous({ href, text }: { href: string; text: string }) {
	return (
		<Link href={href} className="flex items-center text-lg font-bold hover:bg-transparent">
			<ArrowLeft />
			{text}
		</Link>
	);
}
