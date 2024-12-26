import express from "express"
import ProductController from "../controllers/ProductController.js"
const router = express.Router()

router.get("/", ProductController.showProducts)
router.get("/create", ProductController.createProduct)
router.get("/:id", ProductController.getProduct)
router.post("/create", ProductController.createProductPost)
router.post("/remove/:id", ProductController.removeProduct)
router.post("/edit", ProductController.editPost)
router.get("/edit/:id",  ProductController.showEdit)

export default router