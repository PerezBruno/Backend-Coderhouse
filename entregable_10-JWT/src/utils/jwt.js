import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";


export const generateToken = user =>{

  // const token = jwt.sign({user}, JWT_SECRET, {expiresIn: "12h"});
    //const token = jwt.sign({user}, `${JWT_SECRET}`, {expiresIn: "12h"}); //TODO: verificar por qué no funciona!!!????********
    const token = jwt.sign({user}, `claveCoderhouse`, {expiresIn: "12h"});

    return token;
}


export const authToken = (req, res, next)=>{
    //consulto al header para obtener el TOKEN
    const authHeader = req.headers.Authorization

    if(!authHeader){
        return res.status(401).json({
            message: "unauthenticated user"
        })
    }
    const token = authHeader.split(' ')[1]//descarto el "Bearer"
    jwt.sign(token, `claveCoderhouse`, (error, credential)=>{
        if(error){
            return res.satatus(403).json({message: "unauthorized user, invalid TOKEN"})
        }
    } )
    //si es válido el usuario
    req.user = credential.user
    next()

}