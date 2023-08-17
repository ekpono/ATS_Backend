import ApiError from '../middlewares/error/ApiError';
import GetStartedModel from '../models/get-started.model';
import { IGetStarted } from '../types/get-started.type';
import {
  getStartedNotificationTemplate,
  getStartedTemplate,
} from '../utils/helpers/mail';
import { validateGetStarted } from '../utils/validation/get-started.validation';
import { sendMail } from './mail.service';

export const getStarted = async (getStartedDto: IGetStarted) => {
  const { error } = validateGetStarted(getStartedDto);

  if (error) {
    throw new ApiError(400, error.message);
  }

  // await GetStartedModel.create(getStarted);

  const name = getStartedDto.firstName + getStartedDto.lastName;
  const html = getStartedTemplate(getStartedDto.firstName);
  const message = getStartedNotificationTemplate(getStartedDto);
  const email = getStartedDto.email;
  const subject = 'Welcome to Acee Recruitment';
  const from = 'Acee Recruitment <admin@aceejobs.com>';

  sendMail({ name, html, email, subject, from });
  sendMail({
    name,
    html: message,
    email: 'admin@aceejobs.com',
    subject,
    from,
  });
};
