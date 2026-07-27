import Joi from "joi";

export const saveJobSchema = Joi.object({
  jobId: Joi.string().required(),
});
