import { ApplicantFormRepository } from "~/repository/ApplicantFormRepository";
import { ApplicantStatusRepository } from "~/repository/ApplicantStatusRepository";
import { CommentRepository } from "~/repository/CommentRepository";
import { DepartmentRepository } from "~/repository/DepartmentRepository";
import { JobRequestRepository } from "~/repository/JobRequestRepository";
import { OfficeRepository } from "~/repository/OfficeRepository";
import { RatingFormsRepository } from "~/repository/RatingFormsRepository";
import { StagesFormRepository } from "~/repository/StagesFormRepository";
import { UserRepository } from "~/repository/UsersRepository";
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
