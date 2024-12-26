import express from "express"
import cors from "cors"

const app = express()

//CONFIG JSON RESPONSE
app.use(express.json())

// SOLVE CORS
app.use(cors({credentials: true, origin: "http//localhost:3000"}))

//PUBLIC FOLDER FOR IMAGES
app.use(express.static("public"))

//ROUTES
import UserRoutes from "../backend/routes/UserRoutes.js"
app.use("/users", UserRoutes)


app.listen(3000)
