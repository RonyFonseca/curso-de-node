import express from "express"
import exphbs from "express-handlebars"
import db from "./db/conn.js"
import Task from "./models/Task.js"

import TasksRoutes from "./routes/tasksRouter.js"

const app = express()
app.use(express.json())

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")
app.set("views","./views")

app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.use("/tasks", TasksRoutes)

db.sync().then(()=>{
    app.listen(3000, () => {
        console.log("Conectado ao banco com sucesso")
    })
}).catch((err)=>{
    console.log(`Erro ao conectar ao banco: ${err}`)
})