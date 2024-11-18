import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "~/components/ui/dialog";
import { toast } from "~/components/ui/use-toast";
import { useUploadThing } from "~/util/uploadthing";
import Aupload from "./UploadComp/Aupload";
import CVupload from "./UploadComp/CVupload";

interface ChildFormProps {
	formData: FormData;
	setCurrent: Dispatch<SetStateAction<string>>;
	handleSubmit: () => void;
}

const DocumentForm: React.FC<ChildFormProps> = (props) => {
	const [resumeFile, setResumeFile] = useState<File | null>(null);
	const [applicationFile, setApplicationFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const [dialogVisible, setDialogVisible] = useState(false);
	const router = useRouter();

	const { startUpload } = useUploadThing("applicantUpload", {
		onClientUploadComplete: (res) => {
			const uploadedFiles = res.map((file) => ({
				name: file.name,
				url: file.url,
			}));

			// Check if resume was uploaded
			if (props.formData.get("resume_name")) {
				// If the resume was uploaded first, upload the application letter next
				props.formData.append("letter_name", uploadedFiles[0].name);
				props.formData.append("letter_url", uploadedFiles[0].url);
				props.handleSubmit(); // Call the submission handler
			} else {
				// If the resume was uploaded, just save its data
				props.formData.append("resume_name", uploadedFiles[0].name);
				props.formData.append("resume_url", uploadedFiles[0].url);
			}

			console.log("---------------");
			props.formData.forEach((value, key) => {
				console.log(key, value);
			});

			toast({
				title: "Files uploaded successfully!",
				description: "Your files have been uploaded successfully",
			});
		},
		onUploadError: () => {
			toast({
				title: "Upload Error",
				description: "An error occurred while uploading the files. Please try again.",
			});
		},
		onUploadBegin: () => {
			toast({
				title: "Upload In Progress",
				description: "Your files are being uploaded. Please wait...",
			});
		},
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!resumeFile || !applicationFile) {
			toast({
				title: "Files Missing",
				description: "Please select both resume and application files before submitting.",
			});
			return;
		}
		setLoading(true);
		await startUpload([resumeFile]);
		await startUpload([applicationFile]);
		setLoading(false);
		setDialogVisible(true);
	};

	const dialogClose = () => {
		setDialogVisible(false);
		router.push("/");
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="mb-8">
					<h1 className="font-medium text-black">
						Attach your CV/Resume and Application Letter
					</h1>
				</div>

				<div className="grid grid-cols-2 gap-5">
					<CVupload setResumeFile={setResumeFile} />
					<Aupload setApplicationFile={setApplicationFile} />
				</div>
				<section className="mt-10 flex w-full justify-end">
					<Button
						type="button"
						onClick={(e) => {
							props.setCurrent("personal");
						}}
						variant="outline"
						className="mr-3 border-2 border-[#666666] text-black hover:scale-95"
					>
						Back
					</Button>
					<Button
						type="submit"
						className="bg-jobdetails hover:scale-95 hover:bg-[#5e1e1e]"
						disabled={loading}
					>
						{loading ? "Submitting..." : "Submit"}
					</Button>
				</section>
			</form>

			{dialogVisible && (
				<Dialog open={dialogVisible} onOpenChange={dialogClose}>
					<DialogContent className="sm:max-h-[100px] sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>
								<div className="flex">
									<div></div>
									Sucessfully Submitted!
								</div>
							</DialogTitle>
							<DialogDescription>
								Application Form has been successfully submitted.
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
};

export default DocumentForm;
