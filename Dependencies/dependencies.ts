import { ApplicantFormRepository } from "~/Repository/ApplicantFormRepository";
import { ApplicantStatusRepository } from "~/Repository/ApplicantStatusRepository";
import { CommentRepository } from "~/Repository/CommentRepository";
import { DepartmentRepository } from "~/Repository/DepartmentRepository";
import { JobRequestRepository } from "~/Repository/JobRequestRepository";
import { OfficeRepository } from "~/Repository/OfficeRepository";
import { RatingFormsRepository } from "~/Repository/RatingFormsRepository";
import { StagesFormRepository } from "~/Repository/StagesFormRepository";
import { UserRepository } from "~/Repository/UsersRepository";
import { ApplicantFormService } from "~/Service/ApplicantFormService";
import { ApplicantStatusService } from "~/Service/ApplicantStatusService";
import { CommentService } from "~/Service/CommentService";
import { DepartmentService } from "~/Service/DepartmentService";
import { JobRequestService } from "~/Service/JobRequestService";
import { OfficeService } from "~/Service/OfficeService";
import { RatingFormsService } from "~/Service/RatingFormsService";
import { StagesFormService } from "~/Service/StagesFormService";
import { UsersService } from "~/Service/UsersService";

const applicantFormRepo = new ApplicantFormRepository();
const applicantStatusRepo = new ApplicantStatusRepository();
const userRepo = new UserRepository();
const stagesFormRepo = new StagesFormRepository();
const departmentRepo = new DepartmentRepository();
const officeRepo = new OfficeRepository();
const jobRequestRepo = new JobRequestRepository();
const ratingFormsRepo = new RatingFormsRepository();
const commentRepo = new CommentRepository();

const applicantFormService = new ApplicantFormService(
	applicantFormRepo,
	departmentRepo,
	officeRepo,
	commentRepo
);
const applicantStatusService = new ApplicantStatusService(applicantStatusRepo);
const userService = new UsersService(userRepo, departmentRepo, officeRepo);
const stagesFormService = new StagesFormService(stagesFormRepo);
const departmentService = new DepartmentService(departmentRepo);
const officeService = new OfficeService(officeRepo);
const jobRequestService = new JobRequestService(jobRequestRepo);
const ratingFormsService = new RatingFormsService(ratingFormsRepo);
const commentService = new CommentService(commentRepo);

export {
	applicantFormService,
	applicantStatusService,
	commentService,
	departmentService, jobRequestService, officeService,
	ratingFormsService,
	stagesFormService,
	userService
};

