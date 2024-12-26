import {Sequelize} from "sequelize"

const sequelize = new Sequelize('toughts', 'root', '', {
    host:"localhost",
    dialect: "mysql"
})

try {
    console.log("Conectado ao banco com sucesso")
    sequelize.authenticate()
}catch(e){
    console.log(`Erro ao conectar ao banco: ${e}`)
}

export default sequelize