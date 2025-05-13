/* Dev notes 
   transporter for transporting emails
   *must finish setting up emails with actual information later 
*/

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  //  email address
    pass: process.env.EMAIL_PASS,  //  email password
  },
});

const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const info = await transporter.sendMail({
      from: '"ManeRoutine" <maneroutine@gmail.com>', // Sender address
      to: userEmail, // List of recipients
      subject: 'Welcome to Our App!', // Subject line
      text: `Hello ${userName},\n\nThank you for signing up with our app! We're excited to have you on board.`, // Plain text body
      html: `<p>Hello <strong>${userName}</strong>,</p><p>Thank you for signing up with our app! We're excited to have you on board.</p>`, // HTML body
    });

    console.log('Email sent: ' + info.response);
  } catch (err) {
    console.error('Error sending email: ', err);
  }
};

module.exports = { sendWelcomeEmail };
