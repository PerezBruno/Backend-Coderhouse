import express from "express";
import { ProductManager } from "../src/ProductManager.js"
import productRouter from "./routes/products.routes.js"
import cartsRouter from "./routes/carts.routes.js";

const PORT = 8080;
const app = express();
const path = "./products/products.json"
const productManager = new ProductManager(path);


//***************MIDLEWEARES**************/
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//routes
app.use('/api/products', productRouter)
app.use('/api/carts', cartsRouter)




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