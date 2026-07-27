import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service";
import { StatusCode } from "../constant/statusCode.enum";

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { item, message, err } = await authService.register(req.body);

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
      console.error("Error in register:", error);
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { item, message, err } = await authService.login(req.body);

      if (err) {
        return res.status(StatusCode.UNAUTHORIZED).json({
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
      console.error("Error in login:", error);
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(StatusCode.OK).json({
        success: true,
        message: "User logged out successfully",
        data: {},
      });
    } catch (error) {
      console.error("Error in logout:", error);
      next(error);
    }
  }

  async me(req: any, res: Response, next: NextFunction) {
    try {
      return res.status(StatusCode.OK).json({
        success: true,
        message: "User profile fetched successfully",
        data: { user: req.user },
      });
    } catch (error) {
      console.error("Error in me:", error);
      next(error);
    }
  }

  async changePassword(req: any, res: Response, next: NextFunction) {
    try {
      const { item, message, err } = await authService.changePassword(req.user!._id as string, req.body);

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
      console.error("Error in changePassword:", error);
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { item, message, err } = await authService.forgotPassword(req.body.email);

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
      console.error("Error in forgotPassword:", error);
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { item, message, err } = await authService.resetPassword(req.body.token, req.body.newPassword);

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
      console.error("Error in resetPassword:", error);
      next(error);
    }
  }

  async updateProfile(req: any, res: Response, next: NextFunction) {
    try {
      const { item, message, err } = await authService.updateProfile(req.user!._id as string, req.body);

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
      console.error("Error in updateProfile:", error);
      next(error);
    }
  }
}

export default new AuthController();
