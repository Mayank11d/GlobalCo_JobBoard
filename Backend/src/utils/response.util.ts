import { Response } from "express";

export const sendResponse = (res: Response, statusCode: number, message: string, data?: any, meta?: any) => {
  const responseData: any = {
    success: true,
    message,
  };
  if (data !== undefined) responseData.data = data;
  if (meta !== undefined) responseData.meta = meta;

  return res.status(statusCode).json(responseData);
};
