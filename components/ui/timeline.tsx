import { HTMLAttributes, LiHTMLAttributes, forwardRef } from "react";
import { cn } from "~/lib/utils";

const Timeline = forwardRef<HTMLOListElement, HTMLAttributes<HTMLOListElement>>(
	({ className, ...props }, ref) => (
		<ol ref={ref} className={cn("flex flex-col", className)} {...props} />
	)
);
Timeline.displayName = "Timeline";

const TimelineItem = forwardRef<HTMLLIElement, LiHTMLAttributes<HTMLLIElement>>(
	({ className, ...props }, ref) => (
		<li
			ref={ref}
			className={cn("relative flex flex-col p-6 pt-0 [&>*]:mb-3", className)}
			{...props}
		/>
	)
);
TimelineItem.displayName = "TimelineItem";

const TimelineTime = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
	({ className, ...props }, ref) => (
		<p
			ref={ref}
			className={cn(
				"absolute translate-x-36 text-sm font-semibold leading-none text-secondary-foreground md:-translate-x-24",
				className
			)}
			{...props}
		/>
	)
);
TimelineTime.displayName = "TimelineTime";

const TimelineConnector = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(
				"absolute left-[30px] top-[5px] h-full w-px -translate-x-1/2 translate-y-2 bg-primary",
				className
			)}
			{...props}
		/>
	)
);
TimelineConnector.displayName = "TimelineConnector";

const TimelineHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn("flex items-center gap-4", className)} {...props} />
	)
);
TimelineHeader.displayName = "TimelineHeader";

const TimelineTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
	({ className, children, ...props }, ref) => (
		<h3
			ref={ref}
			className={cn(
				"font-semibold leading-none tracking-tight text-secondary-foreground",
				className
			)}
			{...props}
		>
			{children}
		</h3>
	)
);
TimelineTitle.displayName = "CardTitle";

const TimelineIcon = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn("flex size-3 flex-col rounded-full bg-primary", className)}
			{...props}
		/>
	)
);
TimelineIcon.displayName = "TimelineIcon";

const TimelineDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
	({ className, ...props }, ref) => (
		<p
			ref={ref}
			className={cn("max-w-sm text-sm text-muted-foreground", className)}
			{...props}
		/>
	)
);
TimelineDescription.displayName = "TimelineDescription";

const TimelineContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn("flex flex-col items-start p-6 pt-0", className)} {...props} />
	)
);
TimelineContent.displayName = "TimelineContent";

export {
	Timeline,
	TimelineConnector,
	TimelineContent,
	TimelineDescription,
	TimelineHeader,
	TimelineIcon,
	TimelineItem,
	TimelineTime,
	TimelineTitle,
};
