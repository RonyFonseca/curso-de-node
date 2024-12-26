import jwt from "jsonwebtoken"

// creat a token
const CreateUserToken = async (user, req, res) =>{
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "nossosecret")

    // return token
    res.status(200).json({
        message: "Você está autenticado",
        token, 
        id: user._id
    })
}

export default CreateUserToken