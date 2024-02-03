import { Router } from "express";
import { authorization, passportError } from "../utils/messagesError.js";
import CartController from "../controllers/carts.controller.js";
import TicketController from "../controllers/ticket.controllers.js"

class cartsRoutes {
  path = "/carts";
  router = Router();
  cartController;
  ticketController;

  constructor() {
    this.ticketController = new TicketController();
    this.cartController = new CartController();
    this.initCartsRoutes();
  }

  initCartsRoutes() {
    //Obtiene los productos del carrito indicado con el cartID
    this.router.get(
      `${this.path}/:cartId`,
      passportError(`jwt`),
      authorization("User"),
      this.cartController.getProductInCartById
    );

    //añade o actualiza un producto asignado a un carrito designado
    this.router.post(
      `${this.path}/:cartId/products/:productId`,
      passportError(`jwt`),
      authorization("User"),
      this.cartController.addProductInCartById
    );

    //DELETE "/:cid" ==> elimina todos los productos del carrito seleccionado
    this.router.delete(
      `${this.path}/:cartId`,
      passportError(`jwt`),
      authorization("User"),
      this.cartController.delProductsInCartById
    );

    // DELETE "/:cid/products/:pid"  ==> eliminará del carrito el producto seleccionado
    this.router.delete(
      `${this.path}/:cartId/products/:productId`,
      passportError(`jwt`),
      authorization("User"),
      this.cartController.delProductsByIdInCartById
    );

    // PUT "api/carts/:cid/products/:pid" ==> actualiza sólo la cantidad del producto pasado
    // this.router.put(
    //   `${this.path}/:cartId/products/:productId`,
    //   passportError(`jwt`),
    //   authorization("User"), this.cartController.putEditQuantity);

    // PUT "/:cid" ==> actualiza el carrito mediante un array

    // this.router.put(
    //   `${this.path}/:cartId`,
    //   passportError(`jwt`),
    //   authorization("User"),
    //   async (req, res) => {
    //     const { cartId } = req.params;
    //     let arrayProducts = req.body;
    //     try {
    //       let newListProducts = await this.cartsManager.insertArray(
    //         cartId,
    //         arrayProducts
    //       );
    //       res.status(200).send({
    //         message: `the cart was successfully updated`,
    //         products: newListProducts,
    //       });
    //     } catch (error) {
    //       console.log(
    //         "🚀 ~ file: carts.routes.js:140 ~ cartsRoutes ~ this.router.put ~ error:",
    //         error
    //       );
    //     }
    //   }
    // );

    this.router.post(
      `${this.path}/:cartId/purchase`,
      passportError(`jwt`),
      authorization("User"), this.ticketController.postBuy)
  }
}

export default cartsRoutes;
