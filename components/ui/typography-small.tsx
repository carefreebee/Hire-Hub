import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				outline:
					"border border-input text-accent-foreground",
			},
			size: {
				default: "h-10 px-0 py-2",
				sm: "h-5 rounded-md px-3 py-5",
				md: "h-8 rounded-md py-0 px-5",
				lg: "h-8 rounded-md px-5 py-5",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

interface TypographySmallProps
	extends React.HTMLAttributes<HTMLElement>,
		VariantProps<typeof buttonVariants> {
	children: React.ReactNode;
}

export function TypographySmall({
	children,
	className,
	variant,
	size,
	...props
}: TypographySmallProps) {
	return (
		<small className={cn(buttonVariants({ variant, size }), className)} {...props}>
			{children}
		</small>
	);
}
