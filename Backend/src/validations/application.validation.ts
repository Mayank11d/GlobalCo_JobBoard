import Joi from "joi";

export const createApplicationSchema = Joi.object({
  jobId: Joi.string().required(),
  resumeUrl: Joi.string().uri().required(),
  coverLetter: Joi.string().optional().allow(""),
});

export const updateApplicationStatusSchema = Joi.object({
  status: Joi.string().valid("pending", "reviewing", "interviewing", "rejected", "hired").required(),
});
