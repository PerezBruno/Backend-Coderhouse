import nodemailer from "nodemailer";
import { PASSWORD_EMAIL } from "./config.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "brunoleandroperez.test01@gmail",
    pass: PASSWORD_EMAIL,
    authMethod: "LOGIN",
  },
});

export default transporter;
