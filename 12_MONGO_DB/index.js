import express from "express"
import exphbs from "express-handlebars"
import productsRoutes from "./routes/productsRoutes.js"
import ProductController from "./controllers/ProductController.js"
import db from "./db/conn.js"

const app = express()
app.use(express.json())

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")
app.set("views", "./views")

// read body
app.use(express.urlencoded({extended: true}))

app.use('/products', productsRoutes)
app.get('/', ProductController.showProducts)

app.use(express.static("public"))

app.listen(3000)