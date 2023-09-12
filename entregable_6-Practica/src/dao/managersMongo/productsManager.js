import { ProductsModel } from "../models/products.models.js";


class ProductsManager {

   async getAllProducts() {
        try {
          const allProducts = await ProductsModel.find();
    
          return allProducts;
        } catch (error) {
          console.log("🚀 ~ file: productManagers.js:12 ~ productsManager ~ getAllProducts= ~ error:", error)
          
        }
      };

      async getProductById(productId) {
        try {
          const product = await ProductsModel.findById(productId)
          if(product)
            return product
          else
            return null;
        } catch (error) {
          console.log("🚀 ~ file: productManagers.js:25 ~ ProductsManager ~ getProductById ~ error:", error)
          
        }
      }


      async addProduct({ title, description, price, thumbnail, code, stock, status, category }){
        try {
          const productDetails = await ProductsModel.findOne({
            code: code,
          });
    
          if (productDetails && Object.keys(productDetails).length !== 0) {
            return null;
          }
          const newProduct = await ProductsModel.create({ title, description, price, thumbnail, code, stock, status, category });
          return newProduct;
        } catch (error) {
          console.log("🚀 ~ file: productManagers.js:43 ~ ProductsManager ~ error:", error)
          
        }
      }
      

      async updateProductById(productID, { title, description, price, thumbnail, code, stock, status, category }){
        try {
          let updateProduct = await ProductsModel.updateOne({_id: productID}, { title, description, price, thumbnail, code, stock, status, category })
          return updateProduct;
        } catch (error) {
          console.log(
            "🚀 ~ file: ProductManager.js:53 ~ ProductManager ~ updateProduct= ~ error:",
            error
          );
        }

      }

      async deleteProductById(productId){
        try {
          const result = await ProductsModel.findByIdAndDelete(productId)
          //.deleteOne({ _id: productId });
          return result;
        } catch (error) {
          console.log(
            "🚀 ~ file: ProductManager.js:67 ~ ProductManager ~ deleteProduct ~ error:",
            error
          );
        }
      }
}

export default ProductsManager