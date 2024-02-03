import { Router } from "express";
import { createHashValue } from "../utils/bcrypt.js";
import { authorization, passportError } from "../utils/messagesError.js";
import UserController from "../controllers/users.controller.js";
import SessionsController from "../controllers/sessions.controller.js";

class usersRoutes {
  path = "/users";
  router = Router();
  userController;
  sessionControllers;

  constructor() {
    this.userController = new UserController();
    this.sessionControllers = new SessionsController();
    this.initUsersRoutes();
  }
  initUsersRoutes() {
    this.router.delete(
      `${this.path}/all`,
      passportError(`jwt`),
      authorization("Admin"),
      this.userController.deleteAllUsersUser
    );

    this.router.get(
      `${this.path}`,
      passportError(`jwt`),
      authorization("Admin"),
      this.userController.getUsers
    );

    this.router.get(
      `${this.path}/:userId`,
      passportError(`jwt`),
      authorization("Admin"),
      this.userController.getUserById
    );

    this.router.put(
      `${this.path}/:userId`,
      passportError(`jwt`),
      authorization("Admin"),
      this.userController.updateUserById
    );

    this.router.delete(
      `${this.path}/:userId`,
      passportError(`jwt`),
      authorization("Admin"),
      this.userController.deleteUserById
    );

    this.router.post(
      `${this.path}/password-recovery`,
      passportError(`jwt`),
      authorization("User"),
      this.userController.recoveryPassword
    ); //enviar mail

    this.router.post(
      `${this.path}/reset-password/:token`,
      passportError(`jwt`),
      this.userController.resetPassword
    ); //cambiar contraseña

    this.router.delete(
      `${this.path}`,
      passportError(`jwt`),
      authorization("Admin"),
      this.sessionControllers.deleteOfflineUsers
    );
  }
}

export default usersRoutes;
