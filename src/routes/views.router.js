import { Router } from "express";
import ProductManager from "../class/ProductManager.js";

const router = Router()
const manager = new ProductManager("src/base/products.json")

router.get("/", async(req, res)=>{
    const productsFromFile = await manager.getProducts()
    res.render("index", {productsFromFile})
})
export default router