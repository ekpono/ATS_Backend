import nodemailer from 'nodemailer';
import { emailHost, emailPassword, emailService, emailUser } from '../config';
import logger from '../utils/logger';

interface ISendEmail {
  email: string;
  from?: string;
  name?: string;
  html?: string;
  message?: string;
  subject: string;
}

let transporter = nodemailer.createTransport({
  host: emailHost,
  secure: true,
  service: emailService,
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});

export const sendMail = async (mailDto: ISendEmail) => {
  try {
    logger.info('starting mail service');
    await transporter.sendMail({
      from: mailDto.from,
      to: mailDto.email,
      subject: mailDto.subject,
      text: mailDto.message,
      html: mailDto.html,
    });
    logger.info('mail sent successfully');
  } catch (error) {
    logger.error(error);
  }
};
