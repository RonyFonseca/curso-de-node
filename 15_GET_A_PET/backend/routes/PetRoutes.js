import express from "express" 
import PetController from "../controllers/PetController.js"

//midlewares
import verifyToken from "../helpers/verify-token.js"
import { imageUpload } from "../helpers/upload-image.js"

const router = express.Router()

router.post("/create", verifyToken, imageUpload.array("images"), PetController.create)
router.get("/mypets", verifyToken, PetController.getAllPetUser)
router.get("/", PetController.getAllpets)

export default router