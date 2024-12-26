import express from "express"
import ToughtController from "../controllers/ToughtController.js"
import check from "../helpers/auth.js"

const router = express.Router()

router.get("/dashboard", check, ToughtController.dashboard)
router.get("/add", check, ToughtController.creatTought)
router.get("/edit/:id", check, ToughtController.edit)
router.post("/edit", check, ToughtController.editSave)
router.post("/add", check, ToughtController.creatToughtPost)
router.get("/", ToughtController.showToughts)
router.post("/remove", check,ToughtController.remove)

export default router