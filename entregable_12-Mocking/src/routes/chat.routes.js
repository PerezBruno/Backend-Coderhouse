import { Router } from "express";
import ChatController from "../controllers/chats.controller.js";
import { authorization, passportError } from "../utils/messagesError.js";

class chatRoutes {
  path = "/chat";
  router = Router();
  chatController;

  constructor() {
    this.chatController = new ChatController()
    this.initChatRoutes();
  }
  initChatRoutes() {
    this.router.get(`${this.path}`, passportError(`jwt`), authorization('User'), this.chatController.getAllMessages );

    this.router.post(`${this.path}`, passportError(`jwt`), authorization('User'), this.chatController.addMessage)

  }
}

export default chatRoutes;
