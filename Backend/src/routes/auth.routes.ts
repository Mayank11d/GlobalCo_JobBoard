import { Router } from "express";
import authController from "../controllers/auth.controller";
import { validate } from "../middlewares/validation.middleware";
import { registerSchema, loginSchema, changePasswordSchema, forgotPasswordSchema, resetPasswordSchema, updateProfileSchema } from "../validations/auth.validation";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/logout", authController.logout);
router.post("/forgot-password", validate(forgotPasswordSchema), authController.forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema), authController.resetPassword);

router.use(protect);
router.get("/me", authController.me);
router.patch("/change-password", validate(changePasswordSchema), authController.changePassword);
router.patch("/profile", validate(updateProfileSchema), authController.updateProfile);

export default router;
