"use strict";
const nodemailer = require("nodemailer");

module.exports.sendMail = async function sendMail(str, data) {
  //   let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "riteshm887@gmail.com", // generated ethereal user
      pass: "svoodczgiwmhssgi", // generated ethereal password
    },
  });

  let Osubject, Otext, Ohtml;
  if (str == "signup") {
    Osubject = `Thank you for signing ${data.name}`;
    Ohtml = `
                <h1>Welcome to foodApp.com</h1>
                Hope you have a good time!
                Here are your details-
                Name - ${data.name}
                Email - ${data.email}
            `;
  } else if (str == "resetpassword") {
    Osubject = `Reset Password`;
    Ohtml = `
                <h1>foodApp.com</h1>
                Here is your link to reset password!
                ${data.resetPasswordLink}
            `;
  }

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"FoodApp 👻" <riteshm887@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: Osubject, // Subject line
    // plain text body
    html: Ohtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
  //   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //   // Preview only available when sending through an Ethereal account
  //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  //   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
