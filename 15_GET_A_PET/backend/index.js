import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
const app = express()

//CONFIG JSON RESPONSE
app.use(express.json())

// SOLVE CORS
app.use(cors({credentials: true, origin: "http//localhost:3000"}))

//PUBLIC FOLDER FOR IMAGES
app.use(express.static("public"))

//ROUTES
import UserRoutes from "./routes/UserRoutes.js"
app.use("/users", UserRoutes)

import PetRoutes from "./routes/PetRoutes.js"
app.use("/pets", PetRoutes)


app.listen(process.env.PORT)
