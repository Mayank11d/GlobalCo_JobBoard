import { Router } from "express";
import notificationController from "../controllers/notification.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.use(protect);

router.get("/", notificationController.getNotifications);
router.patch("/:id/read", notificationController.markAsRead);
router.patch("/read-all", notificationController.markAllAsRead);

export default router;
