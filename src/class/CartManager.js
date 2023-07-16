import fs from "fs"

export default class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = []
    }
    async #readProductsFromFile() {
        try {
            if (fs.existsSync(this.path)) {
                const dataFile = await fs.promises.readFile(this.path, "utf-8")
                this.carts = JSON.parse(dataFile)
            }
        } catch (error) {
            throw new Error(`Error reading the file: ${this.path} - ${error.message}`)
        }
    }
    async #writeProductsToFile() {
        try {
            fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, "\t"), "utf-8")
        } catch (error) {
            throw new Error(`Error writing the file : ${this.path} - ${error.message}`)
        }
    }
    //?-----------------------------------------
    async createCart() {
        const newCart = { products: [] }
        await this.#readProductsFromFile()
        if (this.carts.length === 0) newCart.id = 1
        else newCart.id = this.carts[this.carts.length - 1].id + 1
        this.carts.push(newCart)
        await this.#writeProductsToFile()
    }
    async getCartById(IdCart) {
        await this.#readProductsFromFile()
        const foundCart = this.carts.find((element) => element.id === IdCart)
        if (!foundCart) throw new Error(`Can't find the cart you are trying to search, id: ${idCart}`)
        return foundCart.products
    }
}