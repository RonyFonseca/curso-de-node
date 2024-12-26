import db from "../db/conn.js"
import { ObjectId } from "mongodb";

class Product{

    constructor(name, image, price, description){
        this.name = name; 
        this.image = image;
        this.price = price; 
        this.description = description
    }

    save(){
        const product = db.db().collection("products").insertOne({
            name: this.name, 
            image: this.image,
            price: this.price,
            description: this.description
        })
        return product
    }

    static getAllProducts(){
        const products = db.db().collection("products").find().toArray()
        return products
    }

    static async getProductByid(id){
        const product = await db.db().collection("products").findOne({_id: new ObjectId(id)})
        return product
    }

    static async remove(id){
        await db.db().collection("products").deleteOne({_id: new ObjectId(id)})
        return 
    }

    postEdit(id){
        db.db().collection("products").updateOne({_id: new ObjectId(id)}, {$set: this})
        return
    }
}

export default Product