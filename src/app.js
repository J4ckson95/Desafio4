import express from "express"
import handlebars from "express-handlebars"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"
import viewsRealTime from "./routes/viewsRealTime.router.js"
import __dirname from "./utils.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/views", viewsRouter)
app.use("/realTimeProducts", viewsRealTime)

app.engine("handlebars", handlebars.engine())
app.set("views", `${__dirname}/views`)
app.set("view engine", "handlebars")

const server = app.listen(7777, () => console.log("Levantando servidor"))
export default server
