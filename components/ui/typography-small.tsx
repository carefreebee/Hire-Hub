import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				// destructive: "bg-destructive text-destructive-foreground bg-destructive/90",
				outline:
					"border border-input text-accent-foreground",
				secondary: "bg-secondary text-secondary-foreground bg-secondary/80",
				// ghost: "bg-accent text-accent-foreground",
				// link: "text-primary underline-offset-4 underline",
			},
			size: {
				default: "h-10 px-0 py-2",
				sm: "h-5 rounded-md px-3 py-5",
				md: "h-8 rounded-md py-0 px-5",
				lg: "h-8 rounded-md px-5 py-5",
				// icon: "h-10 w-10",
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
