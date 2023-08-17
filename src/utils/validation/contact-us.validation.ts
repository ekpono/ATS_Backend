import Joi from 'joi';

export const validateContact = (contact: any) => {
  const contactUs = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string(),
    email: Joi.string().required(),
    message: Joi.string().required(),
  });

  return contactUs.validate(contact);
};
