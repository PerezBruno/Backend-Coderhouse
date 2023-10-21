import { Router } from "express";


class cookieRoutes {
    path = "/cookies";
    router = Router();
    userManager;
  
    constructor() {
      this.initCookieRoutes();
    }
    initCookieRoutes() {
    this.router.get(`${this.path}/setcookie`, (req, res) => {
        res.cookie("cookieCookie", "esto es una cookie", {maxAge: 10000, signed: true}).send("cookie generada")
    })

    this.router.get(`${this.path}/getcookie`, (req, res) => {
        res.send(req.signedCookies)
    })
  }
}
export default cookieRoutes
