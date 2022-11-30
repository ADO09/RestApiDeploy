"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer = require("nodemailer");
exports.transporter = nodemailer.createTransport({
    host: "smtp.gmail.com.",
    port: 587,
    secure: false,
    auth: {
        user: 'fisioliness@gmail.com',
        pass: 'uiwvfsqttolcwxem', // generated ethereal password
    },
});
exports.transporter.verify().then(() => {
    console.log(('READY FOR SEND EMAILS'));
});
