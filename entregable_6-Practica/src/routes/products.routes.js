import { Router } from "express";
import { productsModel } from "../dao/models/products.models.js"

  const productsRoutes = Router();

    productsRoutes.get(`/`, async (req, res) => {
      try {
        const products = await productsModel.find();
        res.status(200).send({
          message: "Get all products successfully",
          products,
        });
      } catch (error) {
        console.log("🚀 ~ file: products.routes.js:20 ~ productsRoutes ~ this.router.get ~ error:", error)
        res.status(400).send({
          message: "error getting products",
          error: error,
        });
      }
    });

    productsRoutes.get(`/:productID`, async (req, res) => {
      const { productID } = req.params;
      try {
        const product = await productsModel.findById(productID);
        if (product) {
          res.status(200).send({
            message: `get product info to id ${productID} successfully`,
            product,
          });
        } else {
          res.status(404).send({
            message: `product with id ${productID} not found`,
          });
        }
      } catch (error) {
        console.log("🚀 ~ file: products.routes.js:43 ~ productsRoutes ~ this.router.get ~ error:", error)
        res.status(400).send({
          message: "error getting product",
          error: error,
        });
      }
    });

    productsRoutes.post(`/`, async (req, res) => {
      const { title, description, price, thumbnail, code, stock, category } = req.body;
      try {
        const newProduct = await productsModel.create({
             title, description, price, thumbnail, code, stock, category 
            });
        res.status(200).send({
          message: "product loaded successfully",
          product: newProduct,
        });
      } catch (error) {
        console.log("🚀 ~ file: products.routes.js:62 ~ productsRoutes ~ this.router.post ~ error:", error)
        res.status(400).send({
          message: "error creating product",
          error: error,
        });
      }
    });



    productsRoutes.put(`/:productID`, async (req, res) => {
      const { productID } = req.params;
      const { title, description, price, thumbnail, code, stock, category } = req.body;
      try {
      const product = await productsModel.findByIdAndUpdate(productID, { title, description, price, thumbnail, code, stock, category });
        if (product) {
          res.status(200).send({
            message: `updated product`,
            product,
          });
        } else {
          res.status(404).send({
            message: `product with id ${productID} not found`,
          });
        }
      } catch (error) {
        console.log("🚀 ~ file: products.routes.js:88 ~ productsRoutes ~ this.router.put ~ error:", error)
        res.status(400).send({
          message: "error getting product",
          error: error,
        });
      }
    });


    productsRoutes.delete(`/:productID`, async (req, res) => {
      const { productID } = req.params;
        try {
            const product = await productsModel.findByIdAndDelete(productID);
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

export default productsRoutes