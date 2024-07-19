"use client";

import { toast } from "~/components/ui/use-toast";
import { UploadDropzone } from "~/util/uploadthing";
import { useUploadDropZone } from "~/util/zustand";

export default function UploadRatingForm() {
	const setFile = useUploadDropZone((state) => state.setFile);

	return (
		<>
			<UploadDropzone
				endpoint="RatingUpload"
				onClientUploadComplete={(res) => {
					// Do something with the response
					setFile(res[0].url);
					toast({
						title: "Rating Form uploaded",
						description: "Rating Form uploaded successfully",
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
