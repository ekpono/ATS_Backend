import { IContact } from '../../types/contact-us.type';
import { IGetStarted } from '../../types/get-started.type';

const emailTemplate = (body: string) => {
  return `
    <html>
      <head></head>
      <body>
        ${body}
      </body>
    </html>
    `;
};

export const passwordResetTemplate = (password: string, fullName: string) => {
  const inviteBody = `
    <h2>Hello ${fullName}</h2>
    <p>You are getting this email because we received a password reset request on your account. Use the password below to login to your account.</p>
    <p>${password}</p>
    <p>Kindly ignore this email if you didn't make this request.</p>
    `;
  return emailTemplate(inviteBody);
};
export const passwordResetSuccessTemplate = (fullName: string) => {
  const inviteBody = `
    <h2>Hello ${fullName}</h2>
    <p>You have sucessfully changed your account password.</p>
    <p>If you didn't make this request please contact support on our platform to retrieve your account.</p>
    `;
  return emailTemplate(inviteBody);
};

export const getStartedTemplate = (name: string) => {
  const inviteBody = `
    <p>Hello ${name}!</p>
    <p>Thank you for choosing Acee recruitment.</p>
    <p>We will reach out to you shortly</p>
    `;
  return emailTemplate(inviteBody);
};

export const getStartedNotificationTemplate = (getStartedDto: IGetStarted) => {
  const inviteBody = `
    <p>${getStartedDto.firstName} just signed up to Acee recruitment!</p>
    <ul>
    <li>email: ${getStartedDto.email}</li>
    <li>phone: ${getStartedDto.phone}</li>
    </ul>
    <p>We will reach out to you shortly</p>
    `;
  return emailTemplate(inviteBody);
};

export const contactTemplate = (contactDto: IContact) => {
  const inviteBody = `
      <p>${contactDto.name} just sent a message!</p>
      <p>${contactDto.message}</p>
      <p>${contactDto.name}'s contacts</p>
      <ul>
      <li>email: ${contactDto.email}</li>
      <li>phone: ${contactDto.phone}</li>
      </ul>
      <p>We will reach out to you shortly</p>
      `;
  return emailTemplate(inviteBody);
};
