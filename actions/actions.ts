import { z } from "zod";
import { applicantSchema } from "~/lib/zod";

// 2. Define a submit handler.
export function onSubmit(values: z.infer<typeof applicantSchema>) {
	// Do something with the form values.
	// ✅ This will be type-safe and validated.
	console.log({ values });
}
