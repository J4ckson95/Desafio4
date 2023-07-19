import { Router } from "express";
import ProductManager from "../class/ProductManager.js";

const router = Router()
const manager = new ProductManager("src/base/products.json")

router.get("/", async (req, res) => {
    const dataFromFile = await manager.getProducts()
    res.send({ status: "Succes", dataFromFile })
})
router.post("/", async (req, res) => {
    const newProduct = req.body;
    if (!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.status || !newProduct.stock || !newProduct.category || !newProduct.thumbnail) return res.status(400).send({ status: error, error: "information is missing" })
    await manager.addProducts(newProduct)
    res.send({ status: "Succes", message: "product added successfully" })
})
router.get("/:Id", async (req, res) => {
    const idProduct = Number(req.params.Id)
    const productFound = await manager.getProductById(idProduct)
    res.send({ status: "Succes", productFound })
})
router.put("/:id", async (req, res) => {
    const idProduct = Number(req.params.id)
    const newData = req.body
    const newProducts = await manager.updateProducts(idProduct, newData)
    res.send({ status: "success", newProducts })
})
router.delete("/:id", async (req, res) => {
    const idProduct = Number(req.params.id)
    await manager.delateProduct(idProduct);
    res.send({
        status: "success", message: "Product delated, perhaps"
    })
})
export default router