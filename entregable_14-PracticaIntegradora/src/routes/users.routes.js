import { Router } from "express";
import { createHashValue } from "../utils/bcrypt.js";
import { authorization, passportError } from "../utils/messagesError.js";
import UserController from "../controllers/users.controller.js";

class usersRoutes {
  path = "/users";
  router = Router();
  userController;

  constructor() {
    this.userController = new UserController();
    this.initUsersRoutes();
  }
  initUsersRoutes() {
    this.router.get(
      `${this.path}`,
      passportError(`jwt`),
      authorization("Admin"),
      this.userController.getUsers
    );

    this.router.get(
      `${this.path}/:userId`,
      passportError(`jwt`),
      authorization(["Admin", "User"]),
      this.userController.getUserById
    );

    this.router.put(
      `${this.path}/:userId`,
      passportError(`jwt`),
      authorization("Admin", "User"),
      this.userController.updateUserById
    );

    this.router.delete(
      `${this.path}/:userId`,
      passportError(`jwt`),
      authorization(["Admin", "User"]),
      this.userController.deleteUserById
    );

    this.router.post(
      `${this.path}/password-recovery`,
      passportError(`jwt`),
      authorization(["Admin", "User"]),
      this.userController.recoveryPassword
    ); //enviar mail

    this.router.post(
      `${this.path}/reset-password/:token`,
      passportError(`jwt`),
      this.userController.resetPassword
    ); //cambiar contraseña
  }
}

export default usersRoutes;
