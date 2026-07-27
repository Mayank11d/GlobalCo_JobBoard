import Joi from "joi";

export const createCompanySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  website: Joi.string().uri().optional().allow(""),
  location: Joi.string().optional().allow(""),
  logoUrl: Joi.string().uri().optional().allow(""),
});

export const updateCompanySchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  website: Joi.string().uri().optional().allow(""),
  location: Joi.string().optional().allow(""),
  logoUrl: Joi.string().uri().optional().allow(""),
});
