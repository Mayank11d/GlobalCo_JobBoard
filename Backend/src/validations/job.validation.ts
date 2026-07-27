import Joi from "joi";

export const createJobSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  companyId: Joi.string().required(),
  recruiterId: Joi.string().optional(),
  location: Joi.string().required(),
  salaryMin: Joi.number().optional(),
  salaryMax: Joi.number().optional(),
  jobType: Joi.string().valid("full-time", "part-time", "contract", "freelance", "internship").required(),
  workMode: Joi.string().valid("remote", "onsite", "hybrid").required(),
  status: Joi.string().valid("draft", "published", "closed").optional(),
  requirements: Joi.array().items(Joi.string()).optional(),
});

export const updateJobSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  companyId: Joi.string().optional(),
  location: Joi.string().optional(),
  salaryMin: Joi.number().optional(),
  salaryMax: Joi.number().optional(),
  jobType: Joi.string().valid("full-time", "part-time", "contract", "freelance", "internship").optional(),
  workMode: Joi.string().valid("remote", "onsite", "hybrid").optional(),
  status: Joi.string().valid("draft", "published", "closed").optional(),
  requirements: Joi.array().items(Joi.string()).optional(),
});
