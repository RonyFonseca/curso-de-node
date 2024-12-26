import express from "express"
import authController from "../controllers/authController.js"

const router = express.Router()

router.get("/login", authController.login)
router.post("/login", authController.loginPost)
router.get("/register", authController.register)
router.post("/register", authController.registerPost)
router.get("/logout", authController.logout)


export default router
