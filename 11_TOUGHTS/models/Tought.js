import { DataTypes } from "sequelize"
import db from "../db/conn.js"

import User from "./User.js"

const Tought = db.define('Tought',{
    title: {
        type: DataTypes.STRING,
        require: true,
    }

})

Tought.belongsTo(User)
User.hasMany(Tought)


export default Tought