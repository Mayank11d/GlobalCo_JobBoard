import { Request, Response, NextFunction } from "express";
import companyService from "../services/company.service";
import { StatusCode } from "../constant/statusCode.enum";

class CompanyController {
  async createCompany(req: any, res: Response, next: NextFunction) {
    try {
      const { item, message, err } = await companyService.createCompany(req.body, req.user._id);

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
      console.error("Error in createCompany:", error);
      next(error);
    }
  }

  async getAllCompanies(req: Request, res: Response, next: NextFunction) {
    try {
      const { item, message, err } = await companyService.getAllCompanies(req.query);

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
      console.error("Error in getAllCompanies:", error);
      next(error);
    }
  }

  async getMyCompany(req: any, res: Response, next: NextFunction) {
    try {
      const { item, message, err } = await companyService.getMyCompany(req.user._id);

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
      console.error("Error in getMyCompany:", error);
      next(error);
    }
  }

  async getCompanyById(req: Request, res: Response, next: NextFunction) {
    try {
      const { item, message, err } = await companyService.getCompanyById(req.params.id as string);

      if (err) {
        return res.status(StatusCode.NOT_FOUND).json({
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
      console.error("Error in getCompanyById:", error);
      next(error);
    }
  }

  async updateCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const { item, message, err } = await companyService.updateCompany(req.params.id as string, req.body);

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
      console.error("Error in updateCompany:", error);
      next(error);
    }
  }

  async deleteCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const { item, message, err } = await companyService.deleteCompany(req.params.id as string);

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
      console.error("Error in deleteCompany:", error);
      next(error);
    }
  }
}

export default new CompanyController();
