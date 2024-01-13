import { Router } from "express";
import LogginController from "../controllers/loggin.controller.js";

class logginRoutes {
    path = "/loggerTest";
    router = Router();
    logginController;
  
    constructor() {
      this.logginController = new LogginController()
      this.initLogginRoutes();
    }
    initLogginRoutes() {
      this.router.get(`${this.path}/fatal`, this.logginController.getFatal)
      this.router.get(`${this.path}/error`, this.logginController.getError)
      this.router.get(`${this.path}/warning`, this.logginController.getWarning)
      this.router.get(`${this.path}/info`, this.logginController.getInfo)
      this.router.get(`${this.path}/debug`, this.logginController.getDebug)
    }
  }
  
  export default logginRoutes
