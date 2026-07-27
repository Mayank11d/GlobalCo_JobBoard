import { Request, Response, NextFunction } from "express";
import dashboardService from "../services/dashboard.service";
import { StatusCode } from "../constant/statusCode.enum";

class DashboardController {
  async getStats(req: any, res: Response, next: NextFunction) {
    try {
      const { item, message, err } = await dashboardService.getStats(req.user);

      if (err) {
        return res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          message,
          errors: err,
        });
      }

      return res.status(StatusCode.OK).json({
        success: true,
        message,
        data: item,
      });
    } catch (error) {
      console.error("Error in getStats:", error);
      next(error);
    }
  }
}

export default new DashboardController();
