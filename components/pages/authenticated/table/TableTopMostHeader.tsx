type TableTopMostHeaderProps = {
	title: string;
	data: number;
};

export default function TableTopMostHeader({ title, data }: TableTopMostHeaderProps) {
	return (
		<div className="flex items-center gap-5 font-medium">
			<p className="text-base text-muted-foreground">{title}</p>
			<p className="rounded-md bg-[#7F0000] px-1.5 py-1 text-white">{data}</p>
		</div>
	);
}
