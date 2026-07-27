import { Request, Response, NextFunction } from "express";
import Notification from "../models/notification.model";
import { StatusCode } from "../constant/statusCode.enum";

class NotificationController {
  async getNotifications(req: any, res: Response, next: NextFunction) {
    try {
      const notifications = await Notification.find({ recipient: req.user._id }).sort({ createdAt: -1 });

      return res.status(StatusCode.OK).json({
        success: true,
        count: notifications.length,
        data: notifications,
      });
    } catch (error) {
      next(error);
    }
  }

  async markAsRead(req: any, res: Response, next: NextFunction) {
    try {
      const notification = await Notification.findOneAndUpdate(
        { _id: req.params.id, recipient: req.user._id },
        { read: true },
        { new: true }
      );

      if (!notification) {
        return res.status(StatusCode.NOT_FOUND).json({
          success: false,
          message: "Notification not found",
        });
      }

      return res.status(StatusCode.OK).json({
        success: true,
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  }

  async markAllAsRead(req: any, res: Response, next: NextFunction) {
    try {
      await Notification.updateMany(
        { recipient: req.user._id, read: false },
        { read: true }
      );

      return res.status(StatusCode.OK).json({
        success: true,
        message: "All notifications marked as read",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new NotificationController();
