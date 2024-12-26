import { MongoClient } from "mongodb"

const uri = "mongodb://localhost:27017/testemongodb2"

const client  = new MongoClient(uri)

async function run() {
    try {
        await client.connect()
        console.log("Conectado ao banco")
    }catch(e){
        console.log(`Ocorreu um erro: ${e}`)
    }
}

run()

export default client