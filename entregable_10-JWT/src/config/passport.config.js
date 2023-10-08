import local from 'passport-local'
import passport from 'passport'
import GithubStrategy from "passport-github2"
import jwt from "passport-jwt"
import {createHashValue, validatePassword} from "../utils/bcrypt.js"
import UserManager from "../managers/usersManager.js"
import { CALLBACK_URL, CLIENT_ID, CLIENT_SECRET, JWT_SECRET } from './config.js'

const LocalStrategi = local.Strategy;
const JWTStrategi = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const userManager = new UserManager()


    // extraigo la cookie
    const cookieExtractor = req =>{
        console.log("🚀 ~ file: passport.config.js:19 ~ cookieExtractor ~ req.cookies:", req.cookies)
        const token = req.cookies.jwtCookie ? req.cookies.jwtCookie : {};
        console.log("🚀 ~ file: passport.config.js:21 ~ cookieExtractor ~ token:", token)
        return token
    }





// TODO:**** done()=> el "primer parametro" es el error--- si no hay error es null
// ****************   el "segunto parametro" suele ser el usuario que estoy generando. si es "false" es que el usuario ya existe...
const initializePassport = () =>{

    // estretegia con Passport - JWT
    passport.use("jwt", new JWTStrategi({

        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: JWT_SECRET,
    }, async (jwt_payload, done) => {
        try {
            console.log("🚀 ~ file: passport.config.js:32 ~ initializePassport ~ jwt_payload:", jwt_payload)
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))

    // estrategia Passport - local
    passport.use("register", new LocalStrategi({
        passReqToCallback:true,
        usernameField: 'email'
    }, async(req, username, password, done)=>{
        const {first_name, last_name, email, age} = req.body;
        try {
            const user = await userManager.findUserByEmail({email: username})
            if(user){
                return done(null, false);
            }
            const passwordHash = createHashValue(password);
            const newUser = await userManager.addUser({first_name, last_name, age, email, password:passwordHash})
            return done(null, newUser)
        } catch (error) {
            console.log("🚀 ~ file: passport.js:27 ~ initializePassport ~ error:", error)
            return done(error)
        }
    }
    ))


    passport.use('login', new LocalStrategi(
        {usernameField: 'email'}, async(username, password, done) =>{
            try {
                const user = await userManager.findUserByEmail({email: username})
                if(!user){
                    return done(null, false)
                }
                if(validatePassword(password, user.password)){
                    return done(null, user)
                }
                return done(null, false)
            } catch (error) {
                console.log("🚀 ~ file: passport.config.js:39 ~ {usernameField:'email'},async ~ error:", error)
                return done(error)
            }
        }
    ))

        // estrategia Passport - github
    passport.use('github', new GithubStrategy({
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) =>{
        try {

            const user = await userManager.findUserByEmail({email: profile._json?.email})
            if(user){
                done(null, user)
            }else {
                const newUser = await userManager.addUser({
              first_name: profile._json?.name,
              last_name: ' ',
              email: profile._json?.email,
              age: 18, //se agrega por defecto
              password: ' ' //createHashValue(profile._json?.email + profile._json?.name)
                })
                done(null, newUser)
            }
        } catch (error) {
            console.log("🚀 ~ file: passport.config.js:82 ~ initializePassport ~ error:", error)
            
        }
    }))

    //Inicializar session del usuario
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    //Eliminar la session del usuario
    passport.deserializeUser( async (id, done) =>{
        const user = await userManager.getUserById(id)
        done(null, user)
    })
}

export default initializePassport;