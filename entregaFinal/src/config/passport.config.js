import local from 'passport-local'
import GithubStrategy from "passport-github2"
import jwt from "passport-jwt"
import passport from 'passport'
import {createHashValue, validatePassword} from "../utils/bcrypt.js"
import { CALLBACK_URL, CLIENT_ID, CLIENT_SECRET, JWT_SECRET } from './config.js'
import { UsersModel } from '../models/users.models.js'

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;// para extraer el token de las cookies





const initializePassport = () =>{

         //configuración de la estrategia JWT

        const cookieExtractor = req => {
            if(req.cookies.cookieToken){
                const token = req.cookies.cookieToken ? req.cookies.cookieToken:{};
            }
            const token = req.headers.authorization ? req.headers.authorization:{};
            const finalToken = token.split(' ')[1];
            return finalToken    

            // const tokenViejo = req.cookies.cookieToken ? req.cookies.cookieToken : {}
            // console.log("🚀 ~ cookieExtractor ~ tokenViejo:", tokenViejo)
            // return tokenViejo
        }
        
        passport.use("jwt", new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), //El token va a venir desde cookieExtractor
            secretOrKey:JWT_SECRET
        }, async (jwt_payload, done) => { //jwt_payload = info del token (en este caso, datos del cliente)
            try {
                return done(null, jwt_payload)
            } catch (error) {
                console.log("🚀 ~ file: passport.config.js:86 ~ initializePassport ~ error:", error)
                return done(error)
            }
    
        }))





        
// TODO:**** done()=> el "primer parametro" es el error--- si no hay error es null
// ****************   el "segunto parametro" suele ser el usuario que estoy generando. si es "false" es que el usuario ya existe...
    // estrategia Passport - local
    passport.use("register", new LocalStrategy({
        passReqToCallback:true,
        usernameField: 'email'
    }, async(req, username, password, done) => {
        const {first_name, last_name, email, age} = req.body;
        try {
            const user = await UsersModel.findOne({email: username})
            if(user){
                return done(null, false);
            }
            const passwordHash = createHashValue(password);
            const newUser = await UsersModel.create({first_name, last_name, age, email, password:passwordHash})
            return done(null, newUser)
        } catch (error) {
            console.log("🚀 ~ file: passport.config.js:64 ~ initializePassport ~ error:", error)
            return done(error)
        }
    }
    ))


    passport.use('login', new LocalStrategy(
        {usernameField: 'email'}, async(username, password, done) =>{
            try {
                const user = await UsersModel.findOne({email: username})
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

            const user = await UsersModel.findOne({email: profile._json?.email})
            if(user){
                done(null, user)
            }else {
                const newUser = await UsersModel.create({
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
        const user = await UsersModel.findById(id)
        done(null, user)
    })


   
}

export default initializePassport;