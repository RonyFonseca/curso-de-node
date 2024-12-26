import express from "express" 
import exphbs from "express-handlebars"
import db from './db/conn.js'
import User from './models/User.js'
import Adress from "./models/Adress.js"

// Importa as bibliotecas necessárias: express para criar o servidor, express-handlebars para usar templates handlebars, e a conexão com o banco de dados.

const app = express()
// Cria uma instância do servidor Express.

app.use(express.json())
// Configura o servidor para interpretar requisições com conteúdo JSON.

app.engine('handlebars', exphbs.engine());
// Configura o motor de template Handlebars.

app.set('view engine', 'handlebars');
// Define o Handlebars como o motor de visualização padrão.

app.set('views', './views');
// Define o diretório onde estão os arquivos de visualização.

app.use(express.static('public'))
// Configura o diretório 'public' para servir arquivos estáticos como CSS, JS e imagens.

app.use(express.urlencoded({extended: true}))
// Configura o servidor para interpretar dados de formulários enviados via POST.

app.get("/", async(req, res) => {
    const users = await User.findAll({raw:true})

    res.render("home",{users: users})
    // Define a rota raiz '/' para renderizar a view 'home'.
})

app.get("/user/create", (req, res)=>{
    res.render("addUser")
})

app.get("/user/edit/:id", async(req, res) => {
    const id = req.params.id
    const user = await User.findOne({include: Adress, where:{id:id}})

    res.render("updateuser", {user: user.get({plain: true})})
})

app.post("/delete/adress", async(req,res)=> {
    const id = req.body.id
    const UserId = req.body.UserId

    await Adress.destroy({where: {id: id}})

    res.redirect(`/user/edit/${UserId}`)

})

app.post("/adress/creat", async(req,res)=>{
    const {UserId, city, street, number} = req.body
    const adress = {
        UserId,
        city,
        street,
        number,
    }

    await Adress.create(adress)
    res.redirect(`/user/edit/${UserId}`)
})

app.post("/user/update", async(req, res)=> {
    const id = req.body.id
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === "on"){
        newsletter = true
    }else {
        newsletter = false
    }

    const Data = {
        id,
        name,
        occupation,
        newsletter
    }

    await User.update(Data,{where:{id:id}})

    res.redirect('/')
})

app.get("/user/:id", async(req, res) => {
    const id = req.params.id
    const user = await User.findOne({raw: true, where:{id:id}})

    res.render("userview", {user})
})

app.post("/user/delete/:id", async(req,res)=> {
    const id = req.params.id
    await User.destroy({where: {id:id}})
    res.redirect("/")
})

app.post("/user/create", async(req, res)=> {
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === "on"){
        newsletter = true
    }else {
        newsletter = false
    }

    await User.create({name,occupation,newsletter})

    try{
        console.log("Criado com sucesso")
        res.render('addUser')
    }catch(err){
        console.log(`Erro ao criar nome:${name} ${err}`)
    }
})

db.sync().then(()=> {
    app.listen(3000)
}).catch((err)=> {
    console.log(err)
})

