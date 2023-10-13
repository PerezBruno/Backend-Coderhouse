import jwt from "jsonwebtoken";
import { JWT_SECRET, SIGNED_COOKIE } from "../config/config.js";

export const generateToken = user =>{

//    const token = jwt.sign({user}, JWT_SECRET, {expiresIn: "12h"});
    const token = jwt.sign({user}, `${JWT_SECRET}`, {expiresIn: "12h"});
    console.log("🚀 ~ file: jwt.js:7 ~ generateToken ~ token:", token);
    return token;

}

generateToken({
    "_id": "6522e212397eaa88aae7969b",
    "first_name": "Bruno",
    "last_name": "Pérez",
    "age": "50",
    "email": "bperez@123.com",
    "password": "$2b$13$enrIW647cprxK/U.JAtF3OelrkAVI60hdTztVPXyiOgLqeMAB0TXS",
    "role": "User"
  })