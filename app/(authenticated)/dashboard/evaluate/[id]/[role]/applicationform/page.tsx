"use client";
import { useEffect, useState } from "react";
import { getCurrentUser } from "~/actions/actions";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { User } from "~/lib/schema";
import PageFive from "./Pages/PageFive";
import PageFour from "./Pages/PageFour";
import PageOne from "./Pages/PageOne";
import PageSeven from "./Pages/PageSeven";
import PageSix from "./Pages/PageSix";
import PageThree from "./Pages/PageThree";
import PageTwo from "./Pages/PageTwo";

export default function ApplicationForm({ params }: { params: { id: string } }) {
	const [step, setStep] = useState<number>(1);
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	async function fetchCurrentUser() {
		const user = await getCurrentUser();
		setCurrentUser(user);
	}

	useEffect(() => {
		fetchCurrentUser();
	}, []);

	const renderPage = () => {
		switch (step) {
			case 1:
				return <PageOne step={step} />;
			case 2:
				return <PageTwo step={step} />;
			case 3:
				return <PageThree step={step} />;
			case 4:
				return <PageFour step={step} />;
			case 5:
				return <PageFive step={step} />;
			case 6:
				return <PageSix step={step} />;
			case 7:
				return <PageSeven step={step} />;
			default:
				return <PageOne step={step} />;
		}
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Application Form</Button>
			</DialogTrigger>
			<DialogContent className="flex h-[100%] min-w-[60%] flex-col overflow-auto">
				<div className="flex w-full items-center justify-center">
					<DialogTitle>APPLICATION FOR EMPLOYMENT</DialogTitle>
				</div>
				<form>
					<div className="flex w-full items-center justify-around">
						<div className="flex text-sm">
							Position Applied:
							<Input className="h-7" name="positionApplied" />
						</div>
						<div className="flex text-sm">
							College / Department:
							<Input className="h-7" name="collegeDept" />
						</div>
						<div className="flex h-32 w-32 border-2 text-sm">{/*image here */}</div>
					</div>
					{renderPage()}
					<div className="mt-4 flex items-center justify-center gap-2">
						<Button
							type="button"
							onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
							disabled={step === 1}
						>
							Previous
						</Button>
						<Button
							type="button"
							onClick={() => setStep((prev) => Math.min(prev + 1, 7))}
							disabled={step === 7}
						>
							Next
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
