import { cartsModel } from "../models/carts.models.js";
import { ProductsModel } from "../models/products.models.js";

export default class CartController {
  constructor() {}

  async getProductInCartById(req, res) {
    const { cartId } = req.params;
    try {
      const products = await cartsModel.findById(cartId);
      if (products)
        res.status(200).send({
          message: `Products in the cart ${cartId}`,
          products,
        });
      else
        res.status(404).send({
          message: `product with id ${cartId} not found`,
        });
    } catch (error) {
      res.status(400).send({
        message: "error getting carts",
        error,
      });
    }
  }

  async addProductInCartById(req, res) {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    try {
      const cart = await cartsModel.findById(cartId);
      if (cart) {
        const prod = await ProductsModel.findById(productId);
        if (prod) {
          const index = cart.products.findIndex(
            (item) => item.product == productId
          );
          console.log("🚀 ~ file: carts.controller.js:40 ~ CartController ~ addProductInCartById ~ index:", index)
          if (index == -1) {
            cart.products[index].quantity = quantity;
          } else {
            cart.products.push({ product: productId, quantity: quantity });
          }
          const updateCart = await cartsModel.findByIdAndUpdate(cartId, cart);
          res.status(200).send({
            message: "the product was uploaded successfully",
            updateCart,
          });
        } else {
          res.status(404).send({
            message: "product not found",
          });
        }
      } else {
        res.status(404).send({ message: "cart not found" });
      }
    } catch (error) {
      console.log("🚀 ~ file: carts.controller.js:60 ~ CartController ~ addProductInCartById ~ error:", error)
      res.status(400).send({
        message: "error updating cart",
        error,
      });
    }
  }
}
