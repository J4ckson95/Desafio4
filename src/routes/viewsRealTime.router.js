import { Router } from "express";
import { Server } from "socket.io"
import ProductManager from "../class/ProductManager.js";
import server from "../app.js"

const router = Router()
const manager = new ProductManager("src/base/products.json")
const io = new Server(server)


export default router