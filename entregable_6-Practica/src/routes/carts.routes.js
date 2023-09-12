import { Router } from "express";
import { cartsModel } from "../dao/models/carts.models.js";
import { productsModel } from "../dao/models/products.models.js";

const cartsRoutes = Router();

cartsRoutes.post(`/`, async (req, res) => {
  try {
    const cart = await cartsModel.create({});
    res.status(200).send({
      message: `cart created succesfully`,
      cart,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: carts.routes.js:20 ~ cartsRoutes ~ this.router.post ~ error:",
      error
    );
    res.status(400).send({ message: "error creating product", error });
  }
});

cartsRoutes.get(`/:cartID`, async (req, res) => {
  const { cartID } = req.params;
  try {
    const products = await cartsModel.findById(cartID);
    if (products)
      res.status(200).send({
        message: `Products in the cart ${cartID}`,
        products,
      });
    else
      res.status(404).send({
        message: `product with id ${cartID} not found`,
      });
  } catch (error) {
    console.log(
      "🚀 ~ file: carts.routes.js:41 ~ cartsRoutes ~ this.router.get ~ error:",
      error
    );
    res.status(400).send({
      message: "error getting carts",
      error,
    });
  }
});

cartsRoutes.post(`/:cartId/products/:productId`, async (req, res) => {
  const { cartId, productId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await cartsModel.findById(cartId);
    if (cart) {
      const prod = await productsModel.findById(productId);
      if (prod) {
        const index = cart.products.findIndex(
          (item) => item.product == productId
        );
        if (index != -1) {
          cart.products[index].quantity = quantity;
        } else {
          cart.products.push({ product: productId, quantity: quantity });
        }
        const updateCart = await cartsModel.findByIdAndUpdate(cartId, cart);
        res.status(200).send({
          message: "the product was uploaded successfully",
          product: prod,
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
    console.log(
      "🚀 ~ file: carts.routes.js:80 ~ cartsRoutes ~ this.router.post ~ error:",
      error
    );
    res.status(400).send({
      message: "error updating cart",
      error,
    });
  }
});

export default cartsRoutes;
