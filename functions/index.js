const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin')
admin.initializeApp()

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
  const mailOptions = {
    to: data.email,
    subject: `New WAAAM Lunch buddy`,
    html: "<h2>You've been assigned a new lunch buddy!</h2><br><p>Login at www.waaamlunches.com to see who it is.</p>"
  };
  return mailTransport.sendMail(mailOptions).then(() => {
    return console.log('Mail sent')
  });
});
