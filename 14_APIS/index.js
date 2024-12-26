import express from "express"

const app = express()

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

app.post("/createProduct", (req,res)=>{
    const {name, price} = req.body

    console.log(name, price)

    res.status(201).json(`O produto ${name} foi criado com sucesso!`)
})

app.get("/", (req,res)=>{
    res.status(200).json({message:"Primeira rota foi um sucesso"})
})

app.listen(3000)