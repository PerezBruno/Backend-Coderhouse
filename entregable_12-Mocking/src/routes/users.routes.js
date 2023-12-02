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
  }
}

export default usersRoutes;
