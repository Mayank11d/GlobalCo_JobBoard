import { Request, Response, NextFunction } from "express";
import jobService from "../services/job.service";
import { StatusCode } from "../constant/statusCode.enum";

class JobController {
  async createJob(req: any, res: Response, next: NextFunction) {
    try {
      const { item, message, err } = await jobService.createJob({ ...req.body, recruiterId: req.user._id });

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
      console.error("Error in createJob:", error);
      next(error);
    }
  }

  async getAllJobs(req: Request, res: Response, next: NextFunction) {
    try {
      const { item, message, err } = await jobService.getAllJobs(req.query);

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
      console.error("Error in getAllJobs:", error);
      next(error);
    }
  }

  async getJobById(req: Request, res: Response, next: NextFunction) {
    try {
      const { item, message, err } = await jobService.getJobById(req.params.id as string);

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
      console.error("Error in getJobById:", error);
      next(error);
    }
  }

  async updateJob(req: Request, res: Response, next: NextFunction) {
    try {
      const { item, message, err } = await jobService.updateJob(req.params.id as string, req.body);

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
      console.error("Error in updateJob:", error);
      next(error);
    }
  }

  async deleteJob(req: Request, res: Response, next: NextFunction) {
    try {
      const { item, message, err } = await jobService.deleteJob(req.params.id as string);

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
      console.error("Error in deleteJob:", error);
      next(error);
    }
  }
}

export default new JobController();
