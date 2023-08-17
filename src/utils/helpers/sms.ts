export const message = (
  firstName: string,
  paymentLink: string,
  referenceNumber: string,
) => {
  const text = `Hello ${firstName}, your Acee Jobs profile is created!\nUse the following payment link ${paymentLink} to complete payment for activation.\nHere is your reference number ${referenceNumber}.\nThank you`;

  return text;
};
