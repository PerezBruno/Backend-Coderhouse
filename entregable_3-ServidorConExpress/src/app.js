import express from "express";
import { ProductManager } from "../src/ProductManager.js"

const PORT = 8080;
const app = express();
const path = "./products/products.json"
const productManager = new ProductManager(path);

app.use(express.json())

const products = await productManager.getProducts();
console.log("🚀 ~ file: app.js:12 ~ products:", products)


// app.get("/products", async (req,res)=>{
// const products = await productManager.getProducts();
// const limit = Number(req.query.limit);
// if(limit){
//     return res.status(200).json(products.slice(0, limit))
// }else
// return res.status(200).json(products)
// })

app.listen(PORT, ()=>{
console.log(`Server on port ${PORT}`)
})