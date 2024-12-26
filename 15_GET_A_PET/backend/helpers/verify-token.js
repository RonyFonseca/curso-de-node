import jwt from "jsonwebtoken"
import getToken from "./get-token.js"

const verifyToken = (req, res, next) => {
    if(!req.headers.authorization){
        res.status(401).json({message: "Acesso negado"})
        return
    }

    const token = getToken(req)

    if(!token){
        res.status(401).json({message: "Acesso negado"})
        return
    }


    try{
        const verified = jwt.verify(token, "nossosecret")
        req.user = verified
        next()
    } catch(err){
        res.status(400).json({message: "Token invalido"})
        return
    }
}

export default verifyToken