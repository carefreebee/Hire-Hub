import { ApplicantFormRepository } from "~/Repository/ApplicantFormRepository";
import { ApplicantStatusRepository } from "~/Repository/ApplicantStatusRepository";
import { CommentRepository } from "~/Repository/CommentRepository";
import { DepartmentRepository } from "~/Repository/DepartmentRepository";
import { JobRequestRepository } from "~/Repository/JobRequestRepository";
import { OfficeRepository } from "~/Repository/OfficeRepository";
import { RatingFormsRepository } from "~/Repository/RatingFormsRepository";
import { StagesFormRepository } from "~/Repository/StagesFormRepository";
import { UserRepository } from "~/Repository/UsersRepository";
import { ApplicantFormService } from "~/service/ApplicantFormService";
import { ApplicantStatusService } from "~/service/ApplicantStatusService";
import { CommentService } from "~/service/CommentService";
import { DepartmentService } from "~/service/DepartmentService";
import { JobRequestService } from "~/service/JobRequestService";
import { OfficeService } from "~/service/OfficeService";
import { RatingFormsService } from "~/service/RatingFormsService";
import { StagesFormService } from "~/service/StagesFormService";
import { UsersService } from "~/service/UsersService";

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
	jobRequestRepo
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
	departmentService,
	jobRequestService,
	officeService,
	ratingFormsService,
	stagesFormService,
	userService,
};
