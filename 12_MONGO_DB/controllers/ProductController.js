import Product from "../models/Product.js"

class ProductController {

    static async showProducts(req,res){
        try{
            const products = await Product.getAllProducts()
            res.render("products/all", {products})
        }catch(error){console.log(`Erro ao mostrar produtos ${error}`)}
    }

    static createProduct(req,res){
        res.render("products/create")
    }

    static createProductPost(req,res){
        const {name, image, price, description} = req.body
        const product = new Product(name, image, price, description)

        product.save().then((result)=>{
            console.log("Produto inserido", result.insertedId)
        })

        res.redirect("/products/")
    }

    static async getProduct(req, res){
        const id = req.params.id
        const product = await Product.getProductByid(id)

        res.render("products/product", {product})
    }

    static removeProduct(req,res){
        const id = req.params.id
        
        Product.remove(id)
        res.redirect("/")
    }

    static async showEdit(req,res){
        const id = req.params.id
        const product = await Product.getProductByid(id)

        res.render("products/edit",{product})
    }

    static editPost(req,res){
        const {id, name, image, price, description} = req.body
        const product = new Product(name, image, price, description)
        product.postEdit(id)
        res.redirect("/")
    }

}

export default ProductController