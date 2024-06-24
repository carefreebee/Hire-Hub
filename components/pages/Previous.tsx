"use client";

import { useRouter } from "next/navigation";
import { TextProps } from "~/types/types";
import ArrowLeft from "../ui/arrow-left";
import { Button } from "../ui/button";

export default function Previous({ text }: TextProps) {
	const router = useRouter();

	return (
		<div>
			<Button
				onClick={() => router.back()}
				variant={"ghost"}
				className="text-lg font-bold hover:bg-transparent"
			>
				<ArrowLeft />
				{text}
			</Button>
		</div>
	);
}
