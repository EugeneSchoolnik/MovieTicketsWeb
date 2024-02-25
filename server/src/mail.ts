import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const mail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});

export default mail;
