import ApiError from '../middlewares/error/ApiError';
import ContactModel from '../models/contact-us.model';
import { IContact } from '../types/contact-us.type';
import { contactTemplate } from '../utils/helpers/mail';
import { validateContact } from '../utils/validation/contact-us.validation';
import { sendMail } from './mail.service';

export const create = async (createcontactDto: IContact) => {
  const { error } = validateContact(createcontactDto);

  if (error) {
    throw new ApiError(400, error.message);
  }

  await ContactModel.create(createcontactDto);
  const email = createcontactDto.email;
  const from = 'Acee Recruitment <info@aceejobs.com>';
  const subject = 'Contact us';
  const html = contactTemplate(createcontactDto);

  sendMail({ from, html, subject, email: from });
};

export const find = async () => {
  const users = await ContactModel.find({});

  return users;
};

export const findOne = async (id: string) => {
  const contact = await ContactModel.findById(id);

  if (!contact) {
    throw new ApiError(404, 'contact not found');
  }

  return contact;
};

export const deleteOne = async (id: string) => {
  await ContactModel.deleteOne({ id });
};
