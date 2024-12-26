import express from "express" 
import path from 'path';
import {dirname} from "path"
import { fileURLToPath } from 'url';

const port  = 3000
const app = express()


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const basePath = path.join(__dirname, "pages")

const checkAuth = (req, res, next) => {
    const authStatus = false

    if(authStatus) {
        return true
        next()
    } else {
        return false
        next()
    }
}

app.get("/", (req, res) => {
    const result = app.use(checkAuth)
    if(result) {
        res.sendFile(path.join(basePath, 'index.html'));
    }
})

app.listen(port, ()=> {
    console.log(`O servidor está rodando na porta ${port}`)
})