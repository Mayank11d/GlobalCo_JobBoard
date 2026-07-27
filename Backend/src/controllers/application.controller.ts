import { Request, Response, NextFunction } from "express";
import applicationService from "../services/application.service";
import { StatusCode } from "../constant/statusCode.enum";

class ApplicationController {
  async createApplication(req: any, res: Response, next: NextFunction) {
    try {
      const { item, message, err } = await applicationService.createApplication(req.body, req.user._id);

      if (err) {
        return res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          message: err,
          errors: err,
        });
      }

      return res.status(StatusCode.CREATED).json({
        success: true,
        message,
        data: item,
      });
    } catch (error) {
      console.error("Error in createApplication:", error);
      next(error);
    }
  }

  async getApplicationsForJob(req: Request, res: Response, next: NextFunction) {
    try {
      const { item, message, err } = await applicationService.getApplicationsForJob(req.params.jobId as string, req.query);

      if (err) {
        return res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          message: err,
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
      console.error("Error in getApplicationsForJob:", error);
      next(error);
    }
  }

  async getUserApplications(req: any, res: Response, next: NextFunction) {
    try {
      const { item, message, err } = await applicationService.getUserApplications(req.user._id, req.query);

      if (err) {
        return res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          message: err,
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
      console.error("Error in getUserApplications:", error);
      next(error);
    }
  }

  async getRecruiterApplications(req: any, res: Response, next: NextFunction) {
    try {
      const { item, message, err } = await applicationService.getRecruiterApplications(req.user._id, req.query);

      if (err) {
        return res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          message: err,
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
      console.error("Error in getRecruiterApplications:", error);
      next(error);
    }
  }

  async updateApplicationStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { item, message, err } = await applicationService.updateApplicationStatus(req.params.id as string, req.body.status);

      if (err) {
        return res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          message: err,
          errors: err,
        });
      }

      return res.status(StatusCode.OK).json({
        success: true,
        message,
        data: item,
      });
    } catch (error) {
      console.error("Error in updateApplicationStatus:", error);
      next(error);
    }
  }
}

export default new ApplicationController();
