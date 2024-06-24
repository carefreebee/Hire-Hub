"use server";

export async function handleSubmitApplicantForm(formData: FormData) {
	const ApplicantFormData = {
		first_name: formData.get("first_name") as string,
		last_name: formData.get("last_name") as string,
		email: formData.get("email") as string,
		contact_number: formData.get("contact_number") as string,
		preferred_mode_of_communication: formData.get("preferred_mode_of_communication") as string,
		type_applying_for: formData.get("type_applying_for") as string,
		position_applied: formData.get("position_applied") as string,
		department: formData.get("department") as string,
		notes: formData.get("notes") as string,
	};
	console.log(ApplicantFormData);
}
