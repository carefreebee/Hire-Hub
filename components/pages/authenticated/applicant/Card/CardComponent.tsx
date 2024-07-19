import * as React from "react";

import { cn } from "~/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn("my-10 h-auto rounded-lg border-2 shadow-lg", className)}
			{...props}
		/>
	)
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn("border-b-2", className)}>
			<div className="flex-1" {...props} />
		</div>
	)
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
	({ className, ...props }, ref) => (
		<h3
			ref={ref}
			className={cn("px-5 py-4 text-base font-medium leading-none tracking-tight", className)}
			{...props}
		/>
	)
);
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn("mt-5 flex h-36", className)} {...props} />
	)
);
CardContent.displayName = "CardContent";

const CardSubContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn("flex flex-1 flex-col", className)} {...props} />
	)
);
CardSubContent.displayName = "CardSubContent";

const CardTopLeftSubContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("flex items-center gap-24", className)} {...props} />
));
CardTopLeftSubContent.displayName = "CardTopLeftSubContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn("flex items-center justify-between border-t-2", className)}
			{...props}
		/>
	)
);
CardFooter.displayName = "CardFooter";

export {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardSubContent,
	CardTitle,
	CardTopLeftSubContent,
};
