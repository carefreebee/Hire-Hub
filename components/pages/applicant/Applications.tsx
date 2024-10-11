"use client";
import { useState } from "react";
import ApplicationForm from "./ApplicantForm";
import { Tabs } from "~/components/ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import DocumentForm from "./DocumentForm";

type ApplicationProps = {
	params: { id: number };
};

export default function Application({ params }: ApplicationProps) {
	const [current, setCurrent] = useState("personal");

	return (
		<div>
			<section>
				<Tabs defaultValue="personal">
					<TabsList className="mb-5 flex">
						<TabsTrigger
							onClick={() => {
								setCurrent("personal");
							}}
							value="personal"
							className="mr-5 flex"
							style={{
								color: current === "personal" ? "#7F0000" : "#000",
								fontWeight: current === "personal" ? "bold" : "normal",
							}}
						>
							<div className="mr-2">
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11ZM12 21C15.866 21 19 19.2091 19 17C19 14.7909 15.866 13 12 13C8.13401 13 5 14.7909 5 17C5 19.2091 8.13401 21 12 21Z"
										fill={current === "personal" ? "#7F0000" : "#000"}
									/>
								</svg>
							</div>
							Personal Information
						</TabsTrigger>
						<TabsTrigger
							onClick={() => {
								setCurrent("document");
							}}
							value="document"
							className="flex"
							style={{
								color: current === "document" ? "#7F0000" : "#000",
								fontWeight: current === "document" ? "bold" : "normal",
							}}
						>
							<div className="mr-2">
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M4 6C4 3.79086 5.79086 2 8 2H15.3431C16.404 2 17.4214 2.42143 18.1716 3.17157L20.8284 5.82843C21.5786 6.57857 22 7.59599 22 8.65685V18C22 20.2091 20.2091 22 18 22H8C5.79086 22 4 20.2091 4 18V6Z"
										stroke={current === "document" ? "#7F0000" : "#000"}
										stroke-width="1.5"
										stroke-linejoin="round"
									/>
									<path
										d="M9 7L17 7"
										stroke="#16151C"
										stroke-width="1.5"
										stroke-linecap="round"
									/>
									<path
										d="M9 12H17"
										stroke={current === "document" ? "#7F0000" : "#000"}
										stroke-width="1.5"
										stroke-linecap="round"
									/>
									<path
										d="M9 17H13"
										stroke={current === "document" ? "#7F0000" : "#000"}
										stroke-width="1.5"
										stroke-linecap="round"
									/>
								</svg>
							</div>
							Documents
						</TabsTrigger>
					</TabsList>
					<TabsContent value="personal">
						<ApplicationForm params={params} />
					</TabsContent>
					<TabsContent value="document">
						<DocumentForm params={params} />
					</TabsContent>
				</Tabs>
			</section>
		</div>
	);
}
