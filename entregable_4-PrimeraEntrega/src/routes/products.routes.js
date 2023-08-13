import { Router } from "express";

const productRouter = Router();

router.get("/products", async (req,res)=>{
    const products = await productManager.getProducts();
    const limit = Number(req.query.limit);
    if(limit){
        return res.status(200).json(products.slice(0, limit))
    }else
    return res.status(200).json(products)
    })



export default productRouter;