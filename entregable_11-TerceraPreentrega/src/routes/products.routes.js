import { Router } from "express";
import  ProductsManager  from "../managers/productManager.js"
import { authorization, passportError } from "../utils/messagesError.js";
import ProductController from "../controllers/products.controller.js";


class productsRoutes {
  path = "/products";
  router = Router();
  productManager;
  prodController;

  constructor() {
    this.productManager = new ProductsManager()
    this.prodController = new ProductController()
    this.initProductRoutes();
  }
  initProductRoutes() {
    this.router.get(`${this.path}`, this.prodController.getAllProducts)
    this.router.get(`${this.path}/:productID`, this.prodController.getProductById);

    this.router.post(`${this.path}`,passportError(`jwt`), authorization('Admin'), async (req, res) => {
      const { title, description, price, thumbnail, code, stock, category } = req.body;
      try {
        const newProduct = await this.productManager.addProduct({
             title, description, price, thumbnail, code, stock, category 
            });
            if(!newProduct){
              res.status(400).send({
                message: `the product whit code ${code} is alredy register`,
              });
            }else
            res.status(201).send({
              message: "product loaded successfully",
              product: newProduct,
            })
      } catch (error) {
        console.log("🚀 ~ file: products.routes.js:62 ~ productsRoutes ~ this.router.post ~ error:", error)
        res.status(500).send({
          message: "error creating product",
          error: error,
        });
      }
    });



    this.router.put(`${this.path}/:productID`, passportError(`jwt`), authorization('Admin'), async (req, res) => {
      const { productID } = req.params;
      const { title, description, price, thumbnail, code, stock, category } = req.body;
      try {
      let product = await this.productManager.updateProductById(productID, { title, description, price, thumbnail, code, stock, category });
        if (!product) {
          res.status(404).send({
            message: `product with id ${productID} not found`,
          });
        } else {
          res.status(200).send({
            message: `updated product`,
            product,
          });
        }
      } catch (error) {
        console.log("🚀 ~ file: products.routes.js:88 ~ productsRoutes ~ this.router.put ~ error:", error)
        res.status(400).send({
          message: "error updating product",
          error: error,
        });
      }
    });


    this.router.delete(`${this.path}/:productID`, passportError(`jwt`), authorization('Admin'), async (req, res) => {
      const { productID } = req.params;
        try {
           // const product = await ProductsModel.findByIdAndDelete(productID);
           const product = await this.productManager.deleteProductById(productID)
            if (product) {
              res.status(200).send({
                message: `product whith id ${productID} removed successfully`,
                product,
              });
            } else {
              res.status(404).send({
                message: `product with id ${productID} not found`,
              });
            }
        } catch (error) {
          res.status(400).send({
            message: "error deleting product",
            error,
          });
        }
      });
  }
}


export default productsRoutes