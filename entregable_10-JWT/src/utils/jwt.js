import jwt from "passport-jwt";
import { JWT_SECRET } from "../config/config.js";

export const generateJWT = user =>{
    return new Promise ((resolve, reject) =>{
        jwt.sign({user}, JWT_SECRET, {expiresIn: "12h"}, (err, token) =>{
            if (err) {
                console.log("🚀 ~ file: jwt.js:8 ~ jwt.sign ~ err:", err)
                reject("can not generate jwt token");
            }
            resolve(token)
        })
    })
}