import SendGridMail from '@sendgrid/mail'

const sgMail = SendGridMail
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export { sgMail }
