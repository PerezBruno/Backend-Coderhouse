import { Router } from "express";
import UserManager from "../managers/usersManager.js";
import passport from "passport";
import { authorization, passportError } from "../utils/messagesError.js";
import SessionsController from "../controllers/sessions.controller.js";

class SessionRoutes {
  path = "/session";
  router = Router();
  userManager;
  sessionsController;

  constructor() {
    this.sessionsController = new SessionsController();
    this.userManager = new UserManager();
    this.initSessionRoutes();
  }
  initSessionRoutes() {
    this.router.post(
      `${this.path}/login`,
      passport.authenticate("login"),
      this.sessionsController.postLogin
    );

    this.router.get(`${this.path}/logout`, this.sessionsController.getLogout);

    this.router.post(
      `${this.path}/register`,
      passport.authenticate("register"),
      this.sessionsController.postRegister
    );

    // this.router.post(
    //   `${this.path}/update`,
    //   this.sessionsController.postUpdatePassword
    // );

    //***********registro ususario mediante GithubStrategi ***********/

    this.router.get(
      `${this.path}/github`,
      passport.authenticate("github", { scope: ["user:email"] })
    );

    //***********inicio sesión mediante GithubStrategi ***********/

    this.router.get(
      `${this.path}/github/callback`,
      passport.authenticate("github"),
      this.sessionsController.getGithubCallback
    );

    this.router.get(
      `${this.path}/current`,
      passportError(`jwt`),
      authorization("User"),
      async (req, res) => {
        res.send(req.user);
      }
    );
  }
}

export default SessionRoutes;
