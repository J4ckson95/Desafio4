import { Router } from "express";
import CartManager from "../class/CartManager.js";

const router = Router()
const manager = new CartManager("src/base/carts.json")

router.get("/", async (req, res) => {
    await manager.createCart()
    res.send({ status: "Succes", message: "Cart created successfully" })
})
router.get("/:Id", async (req, res) => {
    const idCart = Number(req.params.Id)
    const cartFound = await manager.getCartById(idCart)
    res.send({ status: "Succes", cartFound })
})
router.put("/:cid/product/:pid", async (req, res) => {
    const idCart = Number(req.params.cid)
    const idProduct = Number(req.params.pid)
    const quantity = req.body
    await manager.addProductToCart(idCart, idProduct, quantity)
    res.send({status: "Succes", message: "Produts added "})
})
export default router