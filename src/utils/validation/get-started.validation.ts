import Joi from 'joi';
import { emailRegex, phoneNumberRegex } from '.';

export const validateGetStarted = (details: any) => {
  const getStartedSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().pattern(emailRegex).required(),
    phone: Joi.string()
      .pattern(phoneNumberRegex)
      .messages({
        'string.pattern.base': 'wrong phone number format, add country code',
      })
      .required(),
  });

  return getStartedSchema.validate(details);
};
