import mongoose from "mongoose"

async function main() {
    await mongoose.connect("mongodb://localhost:27017/testemongodb2")
    console.log("Conectou ao banco")
}

main().catch((erro)=> console.log(erro))

export default mongoose