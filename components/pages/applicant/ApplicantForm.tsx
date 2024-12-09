"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";

interface ChildFormProps {
	setCurrent: Dispatch<SetStateAction<string>>;
	setFormData: Dispatch<SetStateAction<FormData>>;
	formData: FormData;
}

const ApplicantForm: React.FC<ChildFormProps> = ({ setCurrent, setFormData, formData }) => {
	const formRef = useRef<HTMLFormElement>(null);
	const [localFormData, setLocalFormData] = useState<FormData>(formData);

	useEffect(() => {
		setLocalFormData(formData);
	}, [formData]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setLocalFormData((prevData) => {
			const newFormData = new FormData();
			prevData.forEach((val, key) => {
				newFormData.append(key, key === name ? value : (val as string));
			});
			return newFormData;
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (formRef.current) {
			const formData = new FormData(formRef.current);
			setFormData(formData);
			setCurrent("document");
		}
	};

	return (
		<div>
			<form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
				<section className="grid grid-cols-1 gap-4 text-[#A2A1A8] sm:grid-cols-2">
					<Input
						placeholder="First Name"
						name="first_name"
						type="text"
						minLength={2}
						maxLength={100}
						required
					/>
					<Input
						placeholder="Last Name"
						name="last_name"
						type="text"
						minLength={2}
						maxLength={100}
						required
					/>
					<Input
						placeholder="Mobile Number"
						name="contact_number"
						type="text"
						minLength={2}
						maxLength={100}
						required
					/>
					<Input
						placeholder="Email Address"
						name="email"
						type="email"
						minLength={2}
						maxLength={100}
						required
					/>
					<div className="grid grid-cols-3 align-middle text-[#A2A1A8]">
						<p>Birthdate:</p>
						<Input
							placeholder="Date of Birth"
							id="bday"
							name="birth_date"
							type="date"
							minLength={2}
							maxLength={100}
							className="col-span-2 justify-end text-[#000] placeholder-[#A2A1A8]"
							required
						/>
					</div>
					<Select name="civilStatus" required>
						<SelectTrigger>
							<SelectValue placeholder="Civil Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="single">Single</SelectItem>
							<SelectItem value="married">Married</SelectItem>
							<SelectItem value="widowed">Widowed</SelectItem>
						</SelectContent>
					</Select>
					<Select name="genderType" required>
						<SelectTrigger>
							<SelectValue placeholder="Gender" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="male">Male</SelectItem>
							<SelectItem value="female">Female</SelectItem>
							<SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
						</SelectContent>
					</Select>
					<Select name="communicationType" required>
						<SelectTrigger>
							<SelectValue placeholder="Preferred Mode of Communication" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="email">Email</SelectItem>
							<SelectItem value="phone_number">Phone</SelectItem>
						</SelectContent>
					</Select>
					<Input
						placeholder="Address"
						name="address"
						type="text"
						minLength={2}
						maxLength={500}
						className="col-span-2"
						required
					/>
					<div className="col-span-2 grid grid-cols-3 gap-4">
						<Input
							placeholder="Province"
							name="province"
							type="text"
							minLength={2}
							maxLength={500}
							required
						/>
						<Input
							placeholder="City"
							name="city"
							type="text"
							minLength={2}
							maxLength={500}
							required
						/>
						<Input
							placeholder="Baranggay"
							name="baranggay"
							type="text"
							minLength={2}
							maxLength={500}
							required
						/>
					</div>
					<Select name="highestEducationalAttainment" required>
						<SelectTrigger>
							<SelectValue placeholder="Highest Educational Attainment" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="doctorate">Doctorate</SelectItem>
							<SelectItem value="masteral">Masteral</SelectItem>
							<SelectItem value="bachelors">Bachelor&apos;s</SelectItem>
							<SelectItem value="highschool">High School Graduate</SelectItem>
							<SelectItem value="elementary">Elementary Graduate</SelectItem>
							<SelectItem value="others">Others</SelectItem>
						</SelectContent>
					</Select>
					<Input
						placeholder="Degree/Course"
						name="degree"
						type="text"
						minLength={2}
						maxLength={500}
						required
					/>
					<Select name="jobExperience" required>
						<SelectTrigger>
							<SelectValue placeholder="Job Experience" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="entry_level">Entry level/No experience</SelectItem>
							<SelectItem value="experienced">
								Experienced Employee (2-4 years)
							</SelectItem>
							<SelectItem value="advanced">Advanced Employee (5+ years)</SelectItem>
						</SelectContent>
					</Select>
					<Input
						placeholder="Skills"
						name="skills"
						type="text"
						minLength={2}
						maxLength={500}
						required
					/>
					<section className="col-span-2 mt-16 flex w-full justify-end">
						<Button
							type="submit"
							className="w-36 bg-[#7F0000] hover:scale-95 hover:bg-[#5e1e1e]"
						>
							Next -&gt;
						</Button>
					</section>
				</section>
			</form>
		</div>
	);
};

export default ApplicantForm;
