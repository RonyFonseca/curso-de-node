import express from "express"
import exphbs from "express-handlebars"
import session from "express-session"
import sessionFileStorage from "session-file-store";(session);
import path from "path"
import os from "os"
import flash from "connect-flash"
import db from "./db/conn.js"

import User from "./models/Tought.js"

import toughtsRoutes from "./routes/toughtsRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import ToughtController from "./controllers/ToughtController.js";

const FileStore = sessionFileStorage(session)

const app = express()
app.use(express.json())

app.engine('handlebars', exphbs.engine({
    extname: 'handlebars',
    defaultLayout: 'main',

    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }

    }))

app.set("view engine", "handlebars")
app.set("views", "./views")

app.use(express.urlencoded({extended: true}))

//session midleware
app.use(
    session({
        name: 'session',
        secret: 'nosso_secreto',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function (){},
            path: path.join(os.tmpdir(),'sessions')
        }),
        cookie: { secure: false }
    })
)

//flash messages
app.use(flash())

//set session res
app.use((req, res, next)=>{
    res.locals.session = req.session
    next()
})

//routes
app.use("/toughts", toughtsRoutes)
app.use("/", authRoutes)
app.get('/', ToughtController.showToughts)

app.use(express.static('public'))

db.sync().then(()=>{
    app.listen(4000)
})