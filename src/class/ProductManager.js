import fs from "fs"

export default class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = []
    }
    async #readProductsFromFile() {
        try {
            if (fs.existsSync(this.path)) {
                const dataFile = await fs.promises.readFile(this.path, "utf-8")
                this.products = JSON.parse(dataFile)
            }
        } catch (error) {
            throw new Error(`Error reading the file: ${this.path} - ${error.message}`)
        }
    }
    async #writeProductsToFile() {
        try {
            fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"), "utf-8")
        } catch (error) {
            throw new Error(`Error writing the file : ${this.path} - ${error.message}`)
        }
    }
    //?----------------------------------------------
    async getProducts() {
        await this.#readProductsFromFile()
        return this.products
    }
    async addProducts(product) {
        await this.#readProductsFromFile()
        if (this.products.some((element) => element.code === product.code)) throw new Error(`There is already a product registered with code ${product.code}`)
        if (this.products.length === 0) product.id = 1
        else product.id = this.products[this.products.length - 1].id + 1
        this.products.push(product)
        await this.#writeProductsToFile()
    }
    async getProductById(Id) {
        await this.#readProductsFromFile()
        return this.products.find((element) => element.id === Id)
    }
    async updateProducts(Id, data) {
        await this.#readProductsFromFile()
        const indexProductToUpdate = this.products.findIndex((element) => element.id === Id)
        if (indexProductToUpdate === -1) throw new Error(`Can't find the product you are trying to update, id: ${Id}`);
        this.products[indexProductToUpdate] = { ...this.products[indexProductToUpdate], ...data }
        await this.#writeProductsToFile()
        return this.products
    }
    async delateProduct(Id) {
        await this.#readProductsFromFile()
        this.products = this.products.filter((element) => element.id !== Id)
        this.#writeProductsToFile()
    }
}