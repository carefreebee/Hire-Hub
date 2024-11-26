import { useDropzone } from "@uploadthing/react";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

interface ChildFormProps {
	setResumeFile: Dispatch<SetStateAction<File | null>>;
}

const CVupload: React.FC<ChildFormProps> = (props) => {
	const [file, setFile] = useState<File | null>(null);

	useEffect(() => {
		props.setResumeFile(file);
	});

	const onDrop = useCallback((acceptedFiles: File[]) => {
		if (acceptedFiles.length > 0) {
			setFile(acceptedFiles[0]);
		}
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: { "application/pdf": [".pdf"] },
		multiple: false,
	});

	return (
		<div>
			<div>
				<h1 className="mb-5 text-black">Upload CV/Resume Letter</h1>
			</div>

			<div
				{...getRootProps()}
				className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dotted border-[#666666]"
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
				{file ? (
					<div className="flex">
						<p className="text-black"> {file.name} </p>
					</div>
				) : (
					<p className="text-black">Select a file or drag and drop here</p>
				)}
			</div>
		</div>
	);
};

export default CVupload;
