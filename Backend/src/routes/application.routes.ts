import { Router } from "express";
import applicationController from "../controllers/application.controller";
import { validate } from "../middlewares/validation.middleware";
import { createApplicationSchema, updateApplicationStatusSchema } from "../validations/application.validation";
import { protect, restrictTo } from "../middlewares/auth.middleware";
import { Role } from "../constant/enum";

const router = Router();

router.use(protect);

router.route("/")
  .get(restrictTo(Role.CANDIDATE), applicationController.getUserApplications)
  .post(restrictTo(Role.CANDIDATE), validate(createApplicationSchema), applicationController.createApplication);

// All applications across recruiter's jobs
router.get("/recruiter", restrictTo(Role.ADMIN, Role.RECRUITER), applicationController.getRecruiterApplications);

router.get("/job/:jobId", restrictTo(Role.ADMIN, Role.RECRUITER), applicationController.getApplicationsForJob);

router.patch("/:id/status", restrictTo(Role.ADMIN, Role.RECRUITER), validate(updateApplicationStatusSchema), applicationController.updateApplicationStatus);

export default router;
