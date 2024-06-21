import { Button } from "~/components/ui/button";

interface PaginationButtonProps {
	onClick: () => void;
	disabled: boolean;
	text: string;
}

export default function PaginationButton({ onClick, disabled, text }: PaginationButtonProps) {
	return (
		<Button variant="outline" size="sm" onClick={onClick} disabled={disabled}>
			{text}
		</Button>
	);
}
