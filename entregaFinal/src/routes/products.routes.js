import { Router } from "express";
import { authorization, passportError } from "../utils/messagesError.js";
import ProductController from "../controllers/products.controller.js";
import upload from "../config/multer.config.js";

class productsRoutes {
  path = "/products";
  router = Router();
  prodController;

  constructor() {
    this.prodController = new ProductController();
    this.initProductRoutes();
  }
  initProductRoutes() {
    this.router.get(`${this.path}`, this.prodController.getProducts);

    this.router.get(
      `${this.path}/:productID`,
      this.prodController.getProductById
    );

    // this.router.post(
    //   `${this.path}/upload`,
    //   upload.single("products"),
    //   // passportError(`jwt`),
    //   // authorization("Admin"),
    //   this.prodController.uploasProductDocument
    // )

    this.router.post(
      `${this.path}`,
      //this.prodController.uploadFile ,
      // passportError(`jwt`),
      // authorization("Admin"),
      this.prodController.addProduct
    );

    this.router.put(
      `${this.path}/:productID`,
      passportError(`jwt`),
      authorization("Admin"),
      this.prodController.updateProductById
    );

    this.router.delete(
      `${this.path}/:productID`,
      passportError(`jwt`),
      authorization("Admin"),
      this.prodController.deleteProductById
    );


  }
}

export default productsRoutes;
