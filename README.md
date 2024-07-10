# HireHub

-- LEGEND --
✅ FINISHED

ADMIN:
✅ Read Users Registration
✅ Updated Users Roles

RECRUITMENT OFFICER:
✅ Create Job Request
✅ Read Job Request
✅ Update Job Request
✅ Delete Job Request

✅ Update Screening Status
⚠️ Update Intial Interview Status
⚠️ Update Teaching Demo Status
⚠️ Update Psychological Exam Status
⚠️ Update Panel Interview Status
⚠️ Update Recommendation for Hiring Status

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
ASSESSED_BY MUST BE REFERENCED INTO THE USER?.USER ID INSTEAD OF HAVING ROLE
INSTEAD OF ["recruitment_staff"] DO THIS INSTEAD [1, 2, 3, 4]

⚠️⚠️⚠️ URGENT UPDATE ⚠️⚠️⚠️
EVALUATE PAGE WILL DISPLAY RECRUITMENT STAGE INTO IN PROGRESS INSTEAD OF THE STAGE NAME

DEPARTMENT/OFFICE's POV:

⚠️ If the applicant is not yet into that stage it department or office should not be able to comment

APPLICANT's POV:
⚠️ Make sure to update the FILE UPLOAD it was not yet set as hidden.
const [resumeUrl, setResumeUrl] = useState<string | undefined>("");
{/_ RESUME INPUT _/}
<input
type="text"
name="resume"
// value={resumeUrl!}
// readOnly
className="text-black"
/>









EVALUATE

TODO:

⚠️ Get the user and check if the role is based on the current logged in
⚠️ Get all the rating forms based on the applicant id
⚠️ Merging the data: rating form + user name and user role then display to the evaluate dashboard
⚠️ Get all the stages for the applicant
⚠️ Find the current stages.stages === "in-progress" and who is the final submitter for that stage
⚠️ Get all the stages for the applicant
