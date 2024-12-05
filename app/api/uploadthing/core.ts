import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	// imageUploader: f({ image: { maxFileSize: "4MB" } })
	// 	// Set permissions and file types for this FileRoute
	// 	.middleware(async ({ req }) => {
	// 		// This code runs on your server before upload
	// 		const user = await auth(req);

	// 		// If you throw, the user will not be able to upload
	// 		if (!user) throw new UploadThingError("Unauthorized");

	// 		// Whatever is returned here is accessible in onUploadComplete as `metadata`
	// 		return { userId: user.id };
	// 	})
	// 	.onUploadComplete(async ({ metadata, file }) => {
	// 		// This code RUNS ON YOUR SERVER after upload
	// 		console.log("Upload complete for userId:", metadata.userId);

	// 		console.log("file url", file.url);

	// 		// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
	// 		return { uploadedBy: metadata.userId };
	// 	}),
	profilePicture: f(["image"]).onUploadComplete((data) => console.log("file", data)),
	applicantUpload: f({
		pdf: { maxFileCount: 2 },
		"application/msword": { maxFileCount: 2 },
	}).onUploadComplete(async ({ file }) => {
		console.log("file url", file.url);
	}),
	RatingUpload: f([
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		"application/msword",
	]).onUploadComplete(async ({ metadata, file }) => {
		const userId = (metadata as any).userId;
		console.log("Upload complete for userId:", userId);
		console.log("file url", file.url);
	}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
