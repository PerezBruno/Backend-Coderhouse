import nodemailer from "nodemailer";

import express from "express";
import { __dirname } from "./path.js";

const app = express();

let transporter = nodemailer.createTransport({

    host: 'smtp.gmail.com',

    port: 465,

    secure: true,

    auth: {

        user: 'brunoleandroperez.test01@gmail.com',

        pass: "alwrvmllkzscdxup",

        authMethod: 'LOGIN'

    }

})

 

app.get('/mail', async (req, res) => {

    const resultado = await transporter.sendMail({

        from: 'brunoleandroperez.test01@gmail.com',

        to: ['bruno84leandroperez@gmail.com'],

        subject: 'TEST Bruno Perez',

        html:

            `

                <div>

                    <h1>testeando correo</h1>

                </div>

            `,
            attachments: [{
                filename: "perrito.png",
                path: __dirname + `/img/perrito.png`,
                cid: "perrito.png"
            }]

    })

    console.log(resultado)

    res.send("Email enviado")

})

app.listen(4000, ()=>{
    console.log("server connected")
})
