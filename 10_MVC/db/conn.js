import {Sequelize} from "sequelize";

const sequelize = new Sequelize("nodemvc", "root", "", {
    host:"localhost",
    dialect:"mysql"
})

export default sequelize