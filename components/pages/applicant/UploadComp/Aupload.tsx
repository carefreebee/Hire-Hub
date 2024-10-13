import { useState, useCallback } from "react";
import { useDropzone } from "@uploadthing/react";
import { toast } from "~/components/ui/use-toast";
import { Button } from "~/components/ui/button";
import { useUploadThing } from "~/util/uploadthing";

export default function CVupload() {
	const [file, setFile] = useState<File | null>(null);

	const onDrop = useCallback((acceptedFiles: File[]) => {
		if (acceptedFiles.length > 0) {
			setFile(acceptedFiles[0]);
		}
	}, []);

	const { startUpload, routeConfig } = useUploadThing("applicantUpload", {
		onClientUploadComplete: (res) => {
			toast({
				title: "File uploaded successfully!",
				description: "Your application letter has been uploaded successfully.",
			});
		},
		onUploadError: () => {
			toast({
				title: "Error occurred while uploading",
				description: "An error occurred while uploading the file. Please try again.",
			});
		},
		onUploadBegin: () => {
			toast({
				title: "Upload has begun",
				description:
					"Your file is being uploaded. Please wait for the process to complete.",
			});
		},
	});

	const fileTypes = routeConfig ? Object.keys(routeConfig) : ["application/pdf"];
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: { "application/pdf": [".pdf"] },
	});

	const handleCancel = () => {
		setFile(null);
		toast({
			title: "File cleared",
			description: "Your selected file has been cleared.",
		});
	};

	return (
		<div>
			<div>
				<h1 className="mb-5 text-black">Upload Application Letter</h1>
			</div>

			<div
				{...getRootProps()}
				className="flex h-40 w-full flex-col items-center justify-center rounded-xl border-2 border-dotted border-[#666666]"
			>
				<input {...getInputProps()} />
				<div className="mb-2">
					<svg
						width="46"
						height="38"
						viewBox="0 0 46 38"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M31.0088 26.9951L23.0088 18.9951L15.0088 26.9951"
							stroke="black"
							strokeOpacity="0.4"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M23.0088 18.9951V36.9951"
							stroke="black"
							strokeOpacity="0.4"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M39.7887 31.7751C41.7394 30.7116 43.2804 29.0289 44.1685 26.9923C45.0565 24.9558 45.2411 22.6816 44.6931 20.5285C44.1451 18.3754 42.8957 16.4661 41.142 15.102C39.3884 13.7379 37.2304 12.9966 35.0087 12.9951H32.4887C31.8833 10.6536 30.755 8.47976 29.1886 6.63707C27.6222 4.79439 25.6584 3.33079 23.4449 2.3563C21.2314 1.38181 18.8258 0.921803 16.4089 1.01085C13.9921 1.0999 11.6268 1.73569 9.49106 2.87042C7.35528 4.00515 5.50453 5.60929 4.07795 7.56225C2.65137 9.51521 1.68609 11.7662 1.25467 14.1459C0.823249 16.5256 0.93692 18.9721 1.58714 21.3016C2.23735 23.6311 3.40719 25.7828 5.00871 27.5951"
							stroke="black"
							strokeOpacity="0.4"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
				<p className="text-black">Select a file or drag and drop here</p>
			</div>

			{file ? (
				<div className="mt-4 flex space-x-4">
					<Button
						type="button"
						variant={"outline"}
						className="rounded bg-blue-500 p-2 text-white"
						onClick={() => startUpload([file])}
					>
						Upload {file.name}
					</Button>
					<Button onClick={handleCancel} variant="outline">
						Cancel
					</Button>
				</div>
			) : (
				<Button variant="outline" className="mt-4 text-black" disabled>
					Upload file
				</Button>
			)}
		</div>
	);
}
