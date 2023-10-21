import { ProductsModel } from "../models/products.models.js";

export default class ProductController {
  constructor() {}
  async getAllProducts(req, res) {
    let { limit, page, sort, filter } = req.query;
    console.log(
      "🚀 ~ file: products.controller.js:8 ~ ProductController ~ getAllProducts ~ filter:",
      filter
    );
    const pag = page ? page : 1;
    const lim = limit ? limit : 10;
    const order = sort == "up" ? 1 : -1;
    try {
      const products = await ProductsModel.paginate(
        { filter },
        { limit: lim, page: pag, sort: { price: order } }
      );
      return res.status(200).send({
        message: "Get all products successfully",
        products,
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: products.controller.js:25 ~ ProductController ~ getAllProducts ~ error:",
        error
      );
      res.status(400).send({
        message: "error getting products",
        error: error,
      });
    }
  }

  async getProductById(req, res) {
    const { productID } = req.params;
    try {
      const product = await ProductsModel.findById(productID);
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
      console.log(
        "🚀 ~ file: products.routes.js:58 ~ productsRoutes ~ this.router.get ~ error:",
        error
      );

      res.status(400).send({
        message: "error getting product",
        error: error,
      });
    }
  }
}
