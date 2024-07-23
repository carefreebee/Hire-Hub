import Link from "next/link";
import { Suspense } from "react";
import { Button } from "~/components/ui/button";
import { RatingFormsSelect, User } from "~/lib/schema";
import { StageType } from "~/types/types";
import { formattedNameAndRole } from "~/util/formatted-name";
import { Card, CardContent, CardHeader, CardTitle } from "../Card/CardComponent";
import CommentComponent from "./Comments/CommentComponent";
import CommentForm from "./Comments/CommentForm";

type CommentsProps = {
	stage: StageType;
	applicantId: string;
	evaluatorsId: string;
	resume_name: string;
	resume_url: string;
	letter_name: string;
	letter_url: string;
	document?: RatingFormsSelect[];
	users?: Partial<User>[];
};

export default function CommentsAndDocuments({
	stage,
	applicantId,
	evaluatorsId,
	resume_name,
	resume_url,
	letter_name,
	letter_url,
	document,
	users,
}: CommentsProps) {
	return (
		<section className="flex gap-5">
			<Card className="my-0 flex-1">
				<CardHeader>
					<CardTitle>Comments</CardTitle>
				</CardHeader>
				<CardContent className="h-60 flex-col px-5 pb-5">
					<div className="flex h-[180px] flex-1 flex-col gap-3 overflow-y-auto pb-3">
						<Suspense fallback={<p>Loading...</p>}>
							<CommentComponent applicantId={applicantId} stage={stage || null} />
						</Suspense>
					</div>
					<CommentForm applicantId={applicantId} evaluatorsId={evaluatorsId} />
				</CardContent>
			</Card>
			<Card className="my-0 flex-1">
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>Documents</CardTitle>
					</div>
				</CardHeader>
				<CardContent className="mt-0 flex-wrap gap-3 p-5">
					<ApplicantDocumentDisplay url={resume_url} name={resume_name} />
					<ApplicantDocumentDisplay url={letter_url} name={letter_name} />

					{document &&
						document.map((doc) => {
							const userName = users && users.find((user) => user.id === doc.user_id);
							return (
								<Button
									key={doc.rating_id}
									variant={"outline"}
									asChild
									className="border-[#407BFF] text-[#407BFF] hover:text-[#407BFF]"
								>
									<Link href={doc?.rate as string} target="_blank">
										{doc.recruitment_stage}{" "}
										{formattedNameAndRole(userName?.role as string, "_")}
									</Link>
								</Button>
							);
						})}
				</CardContent>
			</Card>
		</section>
	);
}

function ApplicantDocumentDisplay({ url, name }: { url: string; name: string }) {
	return (
		<Button
			variant={"outline"}
			asChild
			className="border-[#407BFF] text-[#407BFF] hover:text-[#407BFF]"
		>
			<Link href={url} target="_blank">
				{/* {RemoveExtension(name)} */}
				{name}
			</Link>
		</Button>
	);
}
