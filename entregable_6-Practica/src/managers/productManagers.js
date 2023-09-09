import { ProductsModel } from "../models/products.models.js";


class ProductsManager {

    getAllProducts = async () => {
        try {
          const allProducts = await ProductsModel.find();
    
          return allProducts;
        } catch (error) {
          console.log("🚀 ~ file: productManagers.js:12 ~ productsManager ~ getAllProducts= ~ error:", error)
          
        }
      };
}

export default ProductsManager