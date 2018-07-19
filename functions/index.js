const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendEmail = functions.https.onCall((data, context) => {
  console.log(data)
  const mailOptions = {
    to: data.email,
    subject: `Hello`,
    html: "<h2>Hello</h2>"
  };
  return mailTransport.sendMail(mailOptions).then(() => {
    return console.log('Mail sent')
  });
});
