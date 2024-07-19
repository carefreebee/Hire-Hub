type DownloadFormProps = {
	file: string;
	downloadText: string;
	children: React.ReactNode;
};

export default function DownloadForm({ file, downloadText, children }: DownloadFormProps) {
	return (
		<a href={file} download={downloadText} className="text-sm text-[#0F91D2]">
			{children}
		</a>
	);
}
