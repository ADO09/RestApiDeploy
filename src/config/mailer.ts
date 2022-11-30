const nodemailer = require("nodemailer");
import dotenv from 'dotenv';


export const  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com.",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'fisioliness@gmail.com', // generated ethereal user
      pass: 'uiwvfsqttolcwxem', // generated ethereal password
    },
  });

  transporter.verify().then(() =>{
    console.log(('READY FOR SEND EMAILS'));
  })

  