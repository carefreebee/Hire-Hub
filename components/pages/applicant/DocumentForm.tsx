import CVupload from "./UploadComp/CVupload";
import Aupload from "./UploadComp/Aupload";

type DocumentFormProps = {
	params: { id: number };
};

export default function DocumentForm({ params }: DocumentFormProps) {
	return (
		<>
			<div className="mb-8">
				<h1 className="font-medium text-black">
					Attach your CV/Resume and Application Letter
				</h1>
			</div>

			<div className="grid grid-cols-2 gap-5">
				<CVupload />
				<Aupload />
			</div>
		</>
	);
}
