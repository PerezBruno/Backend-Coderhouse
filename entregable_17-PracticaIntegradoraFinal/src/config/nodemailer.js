import nodemailer from "nodemailer";
import { EMAIL_USER, PASSWORD_EMAIL } from "./config.js";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
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

export const sendPurchaseDetail = (email,data)=>{
  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "Gracias por tu compra!",
    html: `
                <h1>Tu pago fué realizado con éxito!</h1>
                <br>
                <p>En los próximos días te llegará la factura</p>
                <br>
                <p>Esperamos que disfrutes tu compra.</p>

            `       
  }
  transporter.sendMail(mailOptions, (error, info)=>{
    if(error)
    console.log("🚀 ~ file: nodemailer.js:30 ~ transporter.sendMail ~ error:", error)
    else
      console.log("email enviado correctamente")
  })
}

export const userDeletionNotice = (email)=>{
  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "Tu cuenta ha sido eliminada!",
    html: `
                <h3>Debido a la inactividad, tu cuenta ha sido eliminada.</h3>
            `       
  }
  transporter.sendMail(mailOptions, (error, info)=>{
    if(error)
    console.log("🚀 ~ file: nodemailer.js:30 ~ transporter.sendMail ~ error:", error)
  })
}