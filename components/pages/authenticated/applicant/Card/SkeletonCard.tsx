import { TableCell, TableRow } from "~/components/ui/table";
import { CardFooter } from "./CardComponent";

const defaultClassName = "animate-pulse rounded-md bg-slate-300";

export function LoadingEvaluateTable({ tableRowLength }: { tableRowLength: number }) {
	return (
		<>
			<TableRow className="animate-pulse bg-slate-300 text-center">
				<TableCell colSpan={tableRowLength} className="h-12 text-center"></TableCell>
				<td></td>
			</TableRow>
			<TableRow className="animate-pulse bg-slate-300 text-center">
				<TableCell colSpan={tableRowLength} className="h-12 text-center"></TableCell>
				<td></td>
			</TableRow>
			<TableRow className="animate-pulse bg-slate-300 text-center">
				<TableCell colSpan={tableRowLength} className="h-12 text-center"></TableCell>
				<td></td>
			</TableRow>
			<TableRow className="animate-pulse bg-slate-300 text-center">
				<TableCell colSpan={tableRowLength} className="h-12 text-center"></TableCell>
				<td></td>
			</TableRow>
		</>
	);
}

export function LoadingButtonMode() {
	return <div className={`${defaultClassName} h-6 w-32 py-1`}></div>;
}

export function LoadingAssessors() {
	return (
		<>
			<div className={`${defaultClassName} ml-5 h-3.5 w-24 py-1`}></div>
			<div className={`${defaultClassName} ml-5 mt-1.5 h-3.5 w-44 py-1`}></div>
			<div className={`${defaultClassName} ml-5 mt-1.5 h-3.5 w-32 py-1`}></div>
		</>
	);
}

export function LoadingCardFooter() {
	return (
		<CardFooter className="justify-between p-3">
			<div className={`${defaultClassName} h-4 w-32`}></div>
			<div className={`${defaultClassName} h-4 w-20`}></div>
		</CardFooter>
	);
}

export function LoadingComment() {
	return (
		<>
			<div className="flex gap-3">
				<div className="h-12 w-12 animate-pulse rounded-full bg-slate-300"></div>
				<div className="flex-1">
					<p className={`${defaultClassName} h-5 w-20`}></p>
					<p className={`${defaultClassName} mt-2 h-10 w-11/12`}></p>
				</div>
			</div>
			<div className="flex gap-3">
				<div className="h-12 w-12 animate-pulse rounded-full bg-slate-300"></div>
				<div className="flex-1">
					<p className={`${defaultClassName} h-5 w-20`}></p>
					<p className={`${defaultClassName} mt-2 h-10 w-11/12`}></p>
				</div>
			</div>
		</>
	);
}
