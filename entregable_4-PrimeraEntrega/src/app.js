import express from "express";
//import { ProductManager } from "../src/ProductManager.js"
import productRouter from "./routes/products.routes.js"
import cartsRouter from "./routes/carts.routes.js";

const PORT = 8080;
const app = express();
//const path = "./products/products.json"
//const productManager = new ProductManager(path);


//***************MIDLEWEARES**************/
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//routes
app.use('/api/products', productRouter)
app.use('/api/carts', cartsRouter)



app.listen(PORT, ()=>{
console.log(`Server on port ${PORT}`)
})