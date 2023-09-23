import { Router } from "express";


//Verifico si el usuario es admin o no
const auth = (req, res, next) => {
    if (req.session.email == "admin@admin.com" && req.session.password == "1234") {
        return next() //Continua con la siguiente ejecucion
    }

    res.send("No tenes acceso a esta ruta")
}

class SessionRoutes {
    router = Router();
    constructor(){
    this.initSessionRoutes();
    }
    initSessionRoutes(){
        this.router.get('/session', (req, res) => {
            if (req.session.counter) {
                req.session.counter++
                res.send(`Ingreso ${req.session.counter} veces`)
            } else {
                req.session.counter = 1
                res.send('Ingreso por primera vez')
            }
        })
        
        this.router.get('/login', (req, res) => {
            const { email, password } = req.body
        
            req.session.email = email
            req.session.password = password
            console.log(req.session.email)
            console.log(req.session.password)
            res.send('Usuario logueado')
        
        })
        
        this.router.get('/admin', auth, (req, res) => {
            res.send('Sos admin')
        })
        
    }
}

export default SessionRoutes;
