import express from "express"
import handlebars from "express-handlebars"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"
import __dirname from "./utils.js"
import { configureRealTimeViews, router } from "./routes/viewsRealTime.router.js"

const app = express()
const server = app.listen(7777, () => console.log("Levantando servidor desde la house"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/views", viewsRouter)
app.use("/realTimeProducts", router)

app.engine("handlebars", handlebars.engine())
app.set("views", `${__dirname}/views`)
app.set("view engine", "handlebars")


configureRealTimeViews(server)

