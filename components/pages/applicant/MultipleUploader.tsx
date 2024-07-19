import { useDropzone } from "@uploadthing/react";
import { useCallback, useState } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from "~/components/ui/button";
import { toast } from "~/components/ui/use-toast";
import { useUploadThing } from "~/util/uploadthing";

type MultiUploaderProps = {
	setUploadFiles: (files: { name: string; url: string; }[]) => void;
};

export function MultiUploader({ setUploadFiles }: MultiUploaderProps) {
	const [files, setFiles] = useState<File[]>([]);

	const onDrop = useCallback((acceptedFiles: File[]) => {
		setFiles(acceptedFiles);
	}, []);

	const { startUpload, routeConfig } = useUploadThing("applicantUpload", {
		onClientUploadComplete: (res) => {
			const uploadedFiles = res.map((file) => ({
				name: file.name,
				url: file.url,
			}));

			setUploadFiles(uploadedFiles);

			toast({
				title: "Files uploaded successfully!",
				description: "Your files have been uploaded successfully",
			});
		},
		onUploadError: () => {
			toast({
				title: "Error occurred while uploading",
				description: "An error occurred while uploading the files. Please try again.",
			});
		},
		onUploadBegin: () => {
			toast({
				title: "Upload has begun",
				description:
					"Your files are being uploaded. Please wait for the process to complete.",
			});
		},
	});

	const fileTypes = routeConfig ? Object.keys(routeConfig) : [];

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
	});

	const handleCancel = () => {
		setFiles([]);
		setUploadFiles([]);
		toast({
			title: "Files cleared",
			description: "Your selected files have been cleared",
		});
	};

	return (
		<div
			{...getRootProps()}
			className="dropzone-container flex h-48 flex-col items-center justify-center rounded-md border-2 border-dashed border-white"
		>
			<input {...getInputProps()} />
			<p className="font-semibold text-blue-500">Drag and Drop files here!</p>
			<small>2 pdf files only.</small>
			{files.length > 0 ? (
				<>
					<Button
						type="button"
						variant={"outline"}
						className="mt-5 rounded bg-blue-500 p-2 text-white"
						onClick={() => startUpload(files)}
					>
						Upload {files.length} files first
					</Button>
					<Button onClick={handleCancel}>Cancel</Button>
				</>
			) : (
				<Button variant={"outline"}>Upload file</Button>
			)}
		</div>
	);
}
