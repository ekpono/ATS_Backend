import Joi from 'joi';

export const jobValidation = (job: any) => {
  const jobSchema = Joi.object({
    title: Joi.string().required(),
    company: Joi.string().required(),
    description: Joi.string().required(),
    reponsibility: Joi.string().required(),
    requirement: Joi.string().required(),
    qualification: Joi.string().required(),
    numberOfExperience: Joi.number().required(),
    salary: Joi.number().required(),
    jobType: Joi.string().required(),
    location: Joi.string().required(),
    hiringManager: Joi.string(),
  });

  return jobSchema.validate(job);
};

export const validateStatus = (job: any) => {
  const jobSchema = Joi.object({
    status: Joi.boolean().required(),
  });

  return jobSchema.validate(job);
};
