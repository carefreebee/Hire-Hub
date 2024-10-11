import CVupload from "./UploadComp/CVupload";

type DocumentFormProps = {
	params: { id: number };
};

export default function DocumentForm({ params }: DocumentFormProps) {
	return (
		<>
			<div>
				<h1 className="font-medium text-black">
					Attach your CV/Resume and Application Letter
				</h1>
			</div>

			<div>
				<CVupload />
			</div>
		</>
	);
}
