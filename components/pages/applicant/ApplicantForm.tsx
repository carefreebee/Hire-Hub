"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { onSubmit } from "~/actions/actions";
import { Button } from "~/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { applicantSchema } from "~/lib/zod";

export default function ApplicantForm() {
	const form = useForm<z.infer<typeof applicantSchema>>({
		resolver: zodResolver(applicantSchema),
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			contact_number: "",
			communication: undefined,
			position: undefined,
			department_name: "",
			office_name: "",
			resume: "",
		},
	});

	const selectedPosition = form.watch("position");

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<section className="flex gap-10">
					<section className="flex flex-1 flex-col gap-5">
						<FormField
							control={form.control}
							name="first_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>First name</FormLabel>
									<FormControl>
										<Input placeholder="First name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="last_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Last name</FormLabel>
									<FormControl>
										<Input placeholder="Last name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="Email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="contact_number"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Contact Number</FormLabel>
									<FormControl>
										<Input placeholder="Contact Number" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="communication"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Communication</FormLabel>
									<FormControl>
										<RadioGroup
											value={field.value}
											onValueChange={field.onChange}
										>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="email" id="r1" />
												<Label htmlFor="r1">Email</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="phone_number" id="r2" />
												<Label htmlFor="r2">Phone Number</Label>
											</div>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="position"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Position</FormLabel>
									<FormControl>
										<RadioGroup
											value={field.value}
											onValueChange={field.onChange}
										>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="teaching_staff" id="r1" />
												<Label htmlFor="r1">Teaching Staff</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem
													value="non-teaching_staff"
													id="r2"
												/>
												<Label htmlFor="r2">Non Teaching Staff</Label>
											</div>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{selectedPosition === "teaching_staff" && (
							<FormField
								control={form.control}
								name="department_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Department Name</FormLabel>
										<Select onValueChange={field.onChange}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a Department" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="department1">
													Department 1
												</SelectItem>
												<SelectItem value="department2">
													Department 2
												</SelectItem>
												<SelectItem value="department3">
													Department 3
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						{selectedPosition === "non-teaching_staff" && (
							<FormField
								control={form.control}
								name="office_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Office Name</FormLabel>
										<Select onValueChange={field.onChange}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select an Office" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="office1">Office 1</SelectItem>
												<SelectItem value="office2">Office 2</SelectItem>
												<SelectItem value="office3">Office 3</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
					</section>
					<section className="flex-1 flex flex-col gap-5">
						<FormField
							control={form.control}
							name="resume"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Resume</FormLabel>
									<FormControl>
										<Input placeholder="Resume" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="cv_letter"
							render={({ field }) => (
								<FormItem>
									<FormLabel>CV Letter</FormLabel>
									<FormControl>
										<Input placeholder="CV Letter" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</section>
				</section>
				<Button type="submit" className="w-full">
					Submit
				</Button>
			</form>
		</Form>
	);
}
