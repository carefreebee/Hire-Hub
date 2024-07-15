import { getUsersByUserID } from "~/Controller/UsersController";

// MERGING THE RATING FORM DATA
// TO DISPLAY THE FIRST NAME
export async function RatingForms(ratingForm: any[]) {
	const mergedData = [];
	for (const form of ratingForm) {
		const user = await getUsersByUserID(form.user_id as string);
		if (user && user.length > 0) {
			mergedData.push({
				...form,
				name: user[0].name,
				role: user[0].role,
			});
		}
	}
	return mergedData;
}
