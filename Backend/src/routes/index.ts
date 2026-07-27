import { Router } from "express";
import authRoutes from "./auth.routes";
import jobRoutes from "./job.routes";
import companyRoutes from "./company.routes";
import applicationRoutes from "./application.routes";
import savedJobRoutes from "./savedJob.routes";
import dashboardRoutes from "./dashboard.routes";
import notificationRoutes from "./notification.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/jobs", jobRoutes);
router.use("/companies", companyRoutes);
router.use("/applications", applicationRoutes);
router.use("/saved-jobs", savedJobRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/notifications", notificationRoutes);

export default router;
