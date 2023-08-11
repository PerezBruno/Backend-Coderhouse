import express from "express";
import { ProductManager } from "../src/ProductManager.js"

const PORT = 8080;
const app = express();
const path = "./products/products.json"
const productManager = new ProductManager(path);

app.use(express.json())


app.get("/products", async (req,res)=>{
const products = await productManager.getProducts();
const limit = Number(req.query.limit);
if(limit){
    return res.status(200).json(products.slice(0, limit))
}else
return res.status(200).json(products)
})

app.get("/products/:pid", async (req, res) => {
    const id = Number(req.params.pid);
    const product = await productManager.getProductById(id);
    if (!product){
      return res.status(404).json(product);
    }else{
      res.status(200).json(product);
    }
  });

app.listen(PORT, ()=>{
console.log(`Server on port ${PORT}`)
})