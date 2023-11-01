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
          message: `'product not found in cart'`,
        });
    } catch (error) {
      res.status(400).send({
        message: "error getting products",
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
            //(item) => item.product == productId
            (item) => item.product._id.toString() === productId
          );
          if (index != -1) {
            cart.products[index].quantity = quantity;
          } else {
            cart.products.push({ product: productId, quantity: quantity });
          }
          const updateCart = await cartsModel.findByIdAndUpdate(cartId, cart);
          res.status(200).send({
            message: "the cart was uploaded successfully",
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
      console.log(
        "🚀 ~ file: carts.controller.js:60 ~ CartController ~ addProductInCartById ~ error:",
        error
      );
      res.status(400).send({
        message: "error updating cart",
        error,
      });
    }
  }

  async delProductsInCartById(req, res) {
    const { cartId } = req.params;
    try {
      const cart = await cartsModel.findById(cartId);
      if (cart) {
        cart.products = [];
        await cart.save();
        res.status(200).send({
          message: `the products in the cart ${cartId} were successfully deleted`,
        });
      } else {
        res.status(404).send({
          message: `can't find cart`,
        });
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: carts.routes.js:86 ~ cartsRoutes ~ this.router.delete ~ error:",
        error
      );
      res.status(400).send({
        message: "error deleting product",
        error,
      });
    }
  }

  async delProductsByIdInCartById(req, res) {
    const { cartId, productId } = req.params;
    try {
      const cart = await cartsModel.findById(cartId);
      if (cart) {
        const index = cart.products.findIndex(
          (item) => item.product._id.toString() == productId
        );
        if (index != -1) {
          const newCart = cart.products.splice(index, 1);
          await cart.save();
          res.status(200).send({
            message: `the product ${productId} in the cart ${cartId} were successfully deleted`,
            products: newCart,
          });
        } else {
          res
            .status(404)
            .send({
              message: `product with id ${productId} not found in cart`,
            });
        }
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: carts.controller.js:113 ~ CartController ~ delProductsByIdInCartById ~ error:",
        error
      );
      res.status(400).send({
        message: "error deleting product",
        error,
      });
    }
  }

  // async editQuantity(req, res) {
  //   const { cartId, productId } = req.params;
  //   const { quantity } = req.body;
  //   try {
  //     const cart = await cartsModel.findById(cartId);
  //     if (cart) {
  //       for (let prod of products) {
  //         // Verifica si el producto ya existe en el carrito
  //         const index = cart.products.findIndex(cartProduct => cartProduct.id_prod._id.toString() === prod.id_prod);
  //         if (index !== -1) {
  //             // Si ya existe, actualizamos la cantidad
  //             cart.products[index].quantity = prod.quantity;
  //         } else {
  //             // Si no existe, primero validamos que el producto exista en la base de datos
  //             const exists = await productModel.findById(prod.id_prod);
  //             if (!exists) {
  //                 throw new Error(`Product with ID ${prod.id_prod} not found`);
  //             }
  //             // Añade el producto al carrito
  //             cart.products.push(prod);
  //         }
  //     }
  //     await cart.save();
  //     res.status(200).send
  //     } else {
  //       return { message: "cart not found" };
  //     }
  //   } catch (error) {
  //     console.log(
  //       "🚀 ~ file: CartsManager.js:101 ~ CartsManager ~ editQuantity ~ error:",
  //       error
  //     );
  //   }
  // }

  // async insertArray (req,res){
  //   const {cartId} = req.params
  //   let arrayProducts = req.body
  //   try {            
  //     const cartProducts = await cartsModel.findById(cartId)//busco el carrito
  //     if(cartProducts){
  //         for (let prod of arrayProducts) {//verifico si existen productos repetidos
  //             const index = cartProducts.products.findIndex(p => p.product._id == prod.product);
  //             console.log("🚀 ~ file: cartsManager.js:111 ~ CartsManager ~ insertArray ~ index:", index)
  //         if (index !== -1) {
  //             cartProducts.products[index].quantity = prod.quantity;
  //         } else {
  //             const exists = await ProductsModel.findById.getProductById(prod.product);
  //             if (exists){
  //                 cartProducts.products.push(prod);
  //             }else {
  //            return ({message: 'product not found'})
  //             }
  //     }}
  //     }else{
  //         return ({message: 'cart not found', })
  //     }
  //     return await cartProducts.save()
  // } catch (error) {
  //     console.log("🚀 ~ file: cartsManager.js:110 ~ CartsManager ~ insertArray ~ error:", error)
      
  // }
  // }


  async buy(req, res){
    const { cartId } = req.params;
    try {
      const cart = await cartsModel.findById(cartId);
      if (cart) {}
    } catch (error) {
      
    }
  }
}
