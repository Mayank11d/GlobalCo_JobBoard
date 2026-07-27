import { Router } from "express";
import jobController from "../controllers/job.controller";
import { validate } from "../middlewares/validation.middleware";
import { createJobSchema, updateJobSchema } from "../validations/job.validation";
import { protect, restrictTo } from "../middlewares/auth.middleware";
import { Role } from "../constant/enum";

const router = Router();

router.route("/")
  .get(jobController.getAllJobs)
  .post(protect, restrictTo(Role.ADMIN, Role.RECRUITER), validate(createJobSchema), jobController.createJob);

router.route("/:id")
  .get(jobController.getJobById)
  .patch(protect, restrictTo(Role.ADMIN, Role.RECRUITER), validate(updateJobSchema), jobController.updateJob)
  .delete(protect, restrictTo(Role.ADMIN, Role.RECRUITER), jobController.deleteJob);

export default router;
