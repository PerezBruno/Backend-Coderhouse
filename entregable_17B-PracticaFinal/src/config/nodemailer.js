import nodemailer from "nodemailer";
import { EMAIL_USER, PASSWORD_EMAIL } from "./config.js";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "brunoleandroperez.test01@gmail.com",
    pass: PASSWORD_EMAIL,
    authMethod: "LOGIN",
  },
});

export const sendRecoveryMail = (email, recoveryLinc)=>{
  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "Link para reestablecer la contraseña",
    html: `
                <h1>Restablecimiento de contraseña</h1>
                <p>Has solicitado restablecer tu contraseña. Haz clic en el enlace de abajo para establecer una nueva:</p>
                <a href="${recoveryLinc}">Restablecer contraseña</a>
                <p>Si no has solicitado restablecer tu contraseña, ignora este correo.</p>
            `       
  }
  transporter.sendMail(mailOptions, (error, info)=>{
    if(error)
    console.log("🚀 ~ file: nodemailer.js:30 ~ transporter.sendMail ~ error:", error)
    else
      console.log("email enviado correctamente")
  })
}

export default transporter;
