"use client";

import {
	Timeline,
	TimelineConnector,
	TimelineContent,
	TimelineDescription,
	TimelineHeader,
	TimelineIcon,
	TimelineItem,
	TimelineTime,
	TimelineTitle,
} from "../../../ui/timeline";

export const TimelineLayout = ({ items }: any) => {
	return (
		<Timeline>
			<TimelineItem>
				<TimelineConnector />
				<TimelineHeader>
					<TimelineTime>{items[0].date}</TimelineTime>
					<TimelineIcon />
					<TimelineTitle>{items[0].title}</TimelineTitle>
				</TimelineHeader>
				<TimelineContent>
					<TimelineDescription>{items[0].description}</TimelineDescription>
				</TimelineContent>
			</TimelineItem>
			<TimelineItem>
				<TimelineConnector />
				<TimelineHeader>
					<TimelineTime>{items[1].date}</TimelineTime>
					<TimelineIcon />
					<TimelineTitle>{items[1].title}</TimelineTitle>
				</TimelineHeader>
				<TimelineContent>
					<TimelineDescription>{items[1].description}</TimelineDescription>
				</TimelineContent>
			</TimelineItem>
			<TimelineItem>
				<TimelineHeader>
					<TimelineTime>{items[2].date}</TimelineTime>
					<TimelineIcon />
					<TimelineTitle>{items[2].title}</TimelineTitle>
				</TimelineHeader>
				<TimelineContent>
					<TimelineDescription>{items[2].description}</TimelineDescription>
				</TimelineContent>
			</TimelineItem>
		</Timeline>
	);
};
