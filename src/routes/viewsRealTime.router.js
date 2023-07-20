import { Router } from "express";
import { Server } from "socket.io"
import ProductManager from "../class/ProductManager.js";

export const router = Router()
const manager = new ProductManager("src/base/products.json")

router.get("/", async (req, res) => {
    const dataFromFile = await manager.getProducts()
    res.render("realTimeProducts", { dataFromFile })
})
export const configureRealTimeViews = (server) => {
    const io = new Server(server)
    io.on("connection", (socket) => {
        console.log("Nuevo cliente conectado");
        socket.emit("data", { dataFromFile })
    })
}
