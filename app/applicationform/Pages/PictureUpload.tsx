"use client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "~/components/ui/use-toast";
import { UploadDropzone } from "~/util/uploadthing";

interface PictureUploadProps {
	setPictureUrlOther: (url: string | null) => void;
	formData: FormData;
}
const PictureUpload: React.FC<PictureUploadProps> = ({ setPictureUrlOther, formData }) => {
	const [pictureUrl, setPictureUrl] = useState<string | null>(null);

	return (
		<div className="flex flex-col items-center">
			{pictureUrl === null && (
				<UploadDropzone
					className="m-0 mb-10 h-60 w-32 self-center"
					endpoint="profilePicture"
					onClientUploadComplete={(res) => {
						const uploadedFiles = res.map((file) => ({
							name: file.name,
							url: file.url,
						}));
						if (uploadedFiles.length > 0) {
							formData.append("picture", uploadedFiles[0].url);
							setPictureUrl(uploadedFiles[0].url);
							setPictureUrlOther(uploadedFiles[0].url);
						}

						toast({
							title: "Picture uploaded successfully!",
							description: "Your picture has been uploaded successfully",
						});
					}}
					onUploadError={(error: Error) => {
						toast({
							title: "Upload Error",
							description: `An error occurred while uploading the picture: ${error.message}`,
						});
					}}
					onUploadBegin={() => {
						toast({
							title: "Upload In Progress",
							description: "Your picture is being uploaded. Please wait...",
						});
					}}
				/>
			)}
			{pictureUrl && (
				<Image src={pictureUrl} alt="Uploaded Picture" width={128} height={128} />
			)}
		</div>
	);
};

export default PictureUpload;
