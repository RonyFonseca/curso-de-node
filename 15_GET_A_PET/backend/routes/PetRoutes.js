import express from "express" 
import PetController from "../controllers/PetController.js"

//midlewares
import verifyToken from "../helpers/verify-token.js"
import { imageUpload } from "../helpers/upload-image.js"

const router = express.Router()

router.post("/create", verifyToken, imageUpload.array("images"), PetController.create)
router.get("/mypets", verifyToken, PetController.getAllPetUser)
router.get("/myadopter", verifyToken, PetController.getAllUserAdopter)
router.get("/:id", PetController.getPetById)
router.delete("/:id", verifyToken, PetController.removePet)
router.get("/", PetController.getAllpets)

export default router