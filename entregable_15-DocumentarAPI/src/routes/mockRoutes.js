import { Router } from "express";
import { authorization, passportError } from "../utils/messagesError.js";
import  FakeProductsController  from "../controllers/fakeProducts.controllers.js"


class mocksRoutes {
    path = "/mockingproducts";
    router = Router();
    fakeProductsController
  
    constructor() {
      this.fakeProductsController = new FakeProductsController()
      this.initMocksRoutes();
    }
    initMocksRoutes() {
      this.router.post(`${this.path}`, passportError(`jwt`), authorization('Admin'), this.fakeProductsController.createFakeProducts);
  
    }
  }
  
  export default mocksRoutes;
  