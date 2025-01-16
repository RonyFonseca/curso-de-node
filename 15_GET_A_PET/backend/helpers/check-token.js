import jwt from "jsonwebtoken"
import getToken from "./get-token.js"

const checkToken =(req, res) => {

    if(!req.headers.authorization){
        res.status(422).json({message:"Acesso negado"})
    }

    const token = getToken(req)
    const verified = jwt.verify(token, process.env.JWT_SECRET)

    return verified

}

export default checkToken