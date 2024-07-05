"use client";

import { toast } from "~/components/ui/use-toast";
import { UploadDropzone } from "~/util/uploadthing";
import { useUploadDropZone } from "~/util/zustand";

export default function UploadRatingForm() {
	const { file, setFile } = useUploadDropZone((state) => ({
		file: state.file,
		setFile: state.setFile,
	}));

	return (
		<>
			<UploadDropzone
				endpoint="productPdf"
				onClientUploadComplete={(res) => {
					// Do something with the response
					setFile(res[0].url);
					toast({
						title: "Resume uploaded",
						description: "Resume uploaded successfully",
					});
				}}
				onUploadError={(error: Error) => {
					// Do something with the error.
					alert(`ERROR! ${error.message}`);
				}}
			/>
		</>
	);
}
