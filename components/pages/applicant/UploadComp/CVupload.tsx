import Image from "next/image";

export default function CVupload() {
	return (
		<div>
			<div>
				<h1 className="text-black">Upload CV/Resume</h1>
			</div>

			<div>
				<Image
					src="/public/images/apply-now/Group.png"
					alt="upload"
					width={100}
					height={100}
				/>
				<p className="text-black">Select a file or drag and drop here</p>
			</div>
		</div>
	);
}
