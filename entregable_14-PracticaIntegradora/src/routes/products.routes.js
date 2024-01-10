import { Router } from "express";
import { authorization, passportError } from "../utils/messagesError.js";
import ProductController from "../controllers/products.controller.js";


class productsRoutes {
  path = "/products";
  router = Router();
  prodController;

  constructor() {
    this.prodController = new ProductController()
    this.initProductRoutes();
  }
  initProductRoutes() {
    this.router.get(`${this.path}`, this.prodController.getProducts)

    this.router.get(`${this.path}/:productID`, this.prodController.getProductById);

    this.router.post(`${this.path}`,passportError(`jwt`), authorization('Admin'), this.prodController.addProduct );

    this.router.put(`${this.path}/:productID`, passportError(`jwt`), authorization('Admin'), this.prodController.updateProductById);

    this.router.delete(`${this.path}/:productID`, passportError(`jwt`), authorization('Admin'), this.prodController.deleteProductById);
  }
}

export default productsRoutes