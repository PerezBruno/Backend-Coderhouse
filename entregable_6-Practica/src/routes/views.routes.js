import { Router } from "express";
import ProductsManager from "../managers/productManagers.js";

class ViewsRoutes {
  path = "";
  router = Router();
  productsManager;

  constructor() {
    this.productsManager = new ProductsManager();

    this.initViewsRoutes();
  }

   initViewsRoutes() {


    this.router.get("/products", async (req, res) => {
      const productsList = await this.productsManager.getAllProducts()
      const mappedProducts = productsList.map((prod) => {
        return {
          title: prod.title,
          description: prod.description,
          price: prod.price,
          code: prod.code,
          stock: prod.stock,
        };
      });
      res.status(200).render("home", {
        title: "APP Coderhouse - Lista de productos",
        products: mappedProducts,
      });
    });


    
    this.router.get("/realtimeproducts", async (req, res) => {
      res.status(200).render("realTimeProducts", {
        title: "APP Coderhouse - Tiempo real",
      });
    });

    this.router.get(`/chat`, async (req, res) => {
      res.status(200).render("chat");;
    });
  }
}

export default ViewsRoutes;
