// import cartsModel from "../models/carts.models.js"
// import productsModel from "../models/products.models.js";

// class Carts {

//     async createCart() {
//         try {
//             const newCart = await cartsModel.create()
//             return newCart;
//         } catch (error) {
//             console.log("🚀 ~ file: cartsManager.js:10 ~ Carts ~ createCart ~ error:", error)
            
//         }
//     }
  
//     async getProductsInCartById (cartId) {
//         try {
//             const products = await cartsModel.findById(cartId)
//             if (products)
//           return ({
//             message: `Products in the cart ${cartId}`,
//             products,
//           });
//         else
//           res.status(404).send({
//             message: `product with id ${cartId} not found`,
//           });
//         } catch (error) {
            
//         }
//     };
  
//     addProductInCartById = async (id, product) => {
//       try {
//         let listaCarros = JSON.parse(
//           await fs.promises.readFile(this.path, "utf-8")
//         );
  
//         let cartToUpdate = listaCarros.find((e) => e.id === id);
  
//         let prod = cartToUpdate.products.find((e) => {
//           return e.product === product;
//         });
//         if (!prod) {
//           cartToUpdate.products.push({ product, quantity: 1 });
//           await fs.promises.writeFile(this.path, JSON.stringify(listaCarros));
//           return { message: "Producto cargado correctamente" };
//         } else {
//           let nuevaCantidad = prod.quantity + 1;
//           let posicion = cartToUpdate.products.indexOf(prod);
  
//           let edit = cartToUpdate.products.splice(posicion, 1, {
//             product,
//             quantity: nuevaCantidad,
//           });
//           await fs.promises.writeFile(this.path, JSON.stringify(listaCarros));
//           return { message: "Producto cargado correctamente" };
//         }
//       } catch (error) {
//       console.log("🚀 ~ file: Carts.js:92 ~ Carts ~ addProductInCartById= ~ error", error)
//       }
//     };
//   }


//   export default CartsManager;