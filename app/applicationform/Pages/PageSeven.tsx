import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

interface PageOneProps {
	visible: boolean;
}

export default function PageSeven({ visible }: PageOneProps) {
	const [exams, setExams] = useState([{ id: 1 }]);
	const addExam = () => {
		setExams([...exams, { id: exams.length + 1 }]);
	};
	return (
		<div
			className={
				visible
					? "flex w-full flex-col gap-4 p-8"
					: "pointer-events-none absolute -z-50 h-0 w-0 opacity-0"
			}
		>
			<div className="flex flex-col gap-2">
				General Information
				<div className="flex w-full items-center justify-center gap-2">
					<Input placeholder="Have you applied in CIT-U before?" name="genInfoYesOrNo" />
					<Input placeholder="When?" name="genInfoWhen" />
					<Input placeholder="What college/department?" name="genInfoCollege" />
				</div>
				{exams.map((exam, index) => (
					<div key={exam.id} className="flex w-full items-center justify-center gap-2">
						<Input placeholder="Kinds of Exam Taken" name={`genInfoExam${index + 1}`} />
						<Input placeholder="Date Taken" name={`genInfoDate${index + 1}`} />
						<Input placeholder="Ratings" name={`genInfoRating${index + 1}`} />
					</div>
				))}
				<Button type="button" onClick={addExam} className="mt-4">
					Add More Exams
				</Button>
			</div>
			<div className="flex flex-col gap-2">
				Achievements
				<Textarea
					placeholder="Achievements (e.g. honors/titations/awards, etc."
					name="genInfoAchievements"
				/>
			</div>

			<div className="flex flex-col gap-2">
				Person to be notified in case of emergency
				<div className="flex w-full items-center justify-center gap-2">
					<Input placeholder="Name" name="genInfoEmergencyName" />
					<Input placeholder="Relation" name="genInfoRelation" />
				</div>
				<div className="flex w-full items-center justify-center gap-2">
					<Input placeholder="Address" name="genInfoAddress" />
					<Input placeholder="Contact No." name="genInfoContact" />
				</div>
				<div className="flex w-full items-center justify-center gap-2">
					<Textarea
						placeholder="Please state reason/s why you want to work in CIT"
						name="genInfoReasons"
					/>
				</div>
			</div>
		</div>
	);
}
