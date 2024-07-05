# HireHub

-- LEGEND --
✅ FINISHED

ADMIN:
✅ Read Users Registration
✅ Updated Users Roles


HR HEAD:
✅ Create Job Request
✅ Read Job Request
✅ Update Job Request
✅ Delete Job Request

✅ Read Applicant Lists

-   Update Applicant Lists

APPLICANT FORM:

✅ Create Applicant Form
✅ Read Applicant Form (HR Head POV)



COMMENTS ON EACH STAGES:

✅ Create comments on each stages
✅ Read comments on each stages

Services that are refactored:

✅ ApplicantFormServices
✅ HrHeadUpdatesApplicantStatusServices
✅ CommentServices
✅ JobRequestServices
⚠️/✅ UserService

⚠️ DeptOrOfficeUpdatesApplicantService
⚠️ RatingFormService

-   TODO:

⚠️⚠️⚠️ URGENT UPDATE ⚠️⚠️⚠️
EVALUATE PAGE WILL DISPLAY RECRUITMENT STAGE INTO IN PROGRESS INSTEAD OF THE STAGE NAME

DEPARTMENT/OFFICE's POV:

⚠️ If the applicant is not yet into that stage it department or office should not be able to comment

APPLICANT's POV:
⚠️ Make sure to update the FILE UPLOAD it was not yet set as hidden.
	const [resumeUrl, setResumeUrl] = useState<string | undefined>("");
    {/* RESUME INPUT */}
					<input
						type="text"
						name="resume"
						// value={resumeUrl!}
						// readOnly
						className="text-black"
					/>