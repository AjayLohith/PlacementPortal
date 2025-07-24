// Location: server/utils/sendEmail.js

import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // 1. Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use 'gmail' for simplicity
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address from .env
      pass: process.env.EMAIL_PASS, // Your Gmail App Password from .env
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: `PlacementPedia <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3. Actually send the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
