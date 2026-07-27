import { Request, Response, NextFunction } from "express";
import savedJobService from "../services/savedJob.service";
import { StatusCode } from "../constant/statusCode.enum";

class SavedJobController {
  async saveJob(req: any, res: Response, next: NextFunction) {
    try {
      const { item, message, err } = await savedJobService.saveJob(req.body.jobId, req.user._id);

      if (err) {
        return res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          message,
          errors: err,
        });
      }

      return res.status(StatusCode.CREATED).json({
        success: true,
        message,
        data: item,
      });
    } catch (error) {
      console.error("Error in saveJob:", error);
      next(error);
    }
  }

  async getUserSavedJobs(req: any, res: Response, next: NextFunction) {
    try {
      const { item, message, err } = await savedJobService.getUserSavedJobs(req.user._id, req.query);

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
        count: item?.length,
      });
    } catch (error) {
      console.error("Error in getUserSavedJobs:", error);
      next(error);
    }
  }

  async removeSavedJob(req: any, res: Response, next: NextFunction) {
    try {
      const { item, message, err } = await savedJobService.removeSavedJob(req.params.id, req.user._id);

      if (err) {
        return res.status(StatusCode.NOT_FOUND).json({
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
      console.error("Error in removeSavedJob:", error);
      next(error);
    }
  }
}

export default new SavedJobController();
