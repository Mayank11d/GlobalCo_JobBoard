import Joi from "joi";
import { Role } from "../constant/enum";

export const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid(...Object.values(Role)).default(Role.CANDIDATE),
  resumeUrl: Joi.string().uri().optional(),
  skills: Joi.array().items(Joi.string()).optional(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});

export const updateProfileSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  avatarUrl: Joi.string().uri().optional(),
  headline: Joi.string().optional(),
  bio: Joi.string().optional(),
  skills: Joi.array().items(Joi.string()).optional(),
  resumeUrl: Joi.string().uri().optional(),
});
