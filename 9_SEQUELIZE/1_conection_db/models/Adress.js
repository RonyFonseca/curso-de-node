import { DataTypes } from "sequelize"
import db from "../db/conn.js"
import User from "./User.js"

const Adress = db.define("Adress", {
    city: {
        type: DataTypes.STRING,
        required: true
    },
    street: {
        type: DataTypes.STRING,
        required: true
    },
    number: {
        type: DataTypes.STRING,
        required: true
    }
})

User.hasMany(Adress)
Adress.belongsTo(User)

export default Adress