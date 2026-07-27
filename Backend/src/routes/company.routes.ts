import { Router } from "express";
import companyController from "../controllers/company.controller";
import { validate } from "../middlewares/validation.middleware";
import { createCompanySchema, updateCompanySchema } from "../validations/company.validation";
import { protect, restrictTo } from "../middlewares/auth.middleware";
import { Role } from "../constant/enum";

const router = Router();

router.route("/")
  .get(companyController.getAllCompanies)
  .post(protect, restrictTo(Role.ADMIN, Role.RECRUITER), validate(createCompanySchema), companyController.createCompany);

// Must be before /:id to avoid path conflict
router.get("/my", protect, restrictTo(Role.ADMIN, Role.RECRUITER), companyController.getMyCompany);

router.route("/:id")
  .get(companyController.getCompanyById)
  .patch(protect, restrictTo(Role.ADMIN, Role.RECRUITER), validate(updateCompanySchema), companyController.updateCompany)
  .delete(protect, restrictTo(Role.ADMIN, Role.RECRUITER), companyController.deleteCompany);

export default router;
