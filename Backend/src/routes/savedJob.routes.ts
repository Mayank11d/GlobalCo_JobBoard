import { Router } from "express";
import savedJobController from "../controllers/savedJob.controller";
import { validate } from "../middlewares/validation.middleware";
import { saveJobSchema } from "../validations/savedJob.validation";
import { protect, restrictTo } from "../middlewares/auth.middleware";
import { Role } from "../constant/enum";

const router = Router();

router.use(protect);
router.use(restrictTo(Role.CANDIDATE));

router.route("/")
  .get(savedJobController.getUserSavedJobs)
  .post(validate(saveJobSchema), savedJobController.saveJob);

router.delete("/:id", savedJobController.removeSavedJob);

export default router;
