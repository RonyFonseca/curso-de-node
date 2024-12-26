import User from "../models/User.js"
import bcrypt from "bcrypt"
import CreateUserToken from "../helpers/create-user-token.js"
import getToken from "../helpers/get-token.js"
import jwt from "jsonwebtoken"

class UserController{
    static async register(req, res){
        const {name, email, password, image, phone, confirmpassword} = req.body

        // VALIDATIONS 
        if(!name){
            res.status(422).json({message:"O nome é obrigatório"})
            return 
        }

        if(!phone){
            res.status(422).json({message:"O telefone é obrigatório"})
            return 
        }
        
        if(!email){
            res.status(422).json({message:"O email é obrigatório"})
            return 
        }

        if(!password){
            res.status(422).json({message:"A senha é obrigatória"})
            return 
        }

        if(!confirmpassword){
            res.status(422).json({message:"A senha é obrigatória"})
            return 
        }

        if(password != confirmpassword){
            res.status(422).json({message: "A senha e a confirmação precisam ser iguais!"})
            return
        }

        //check if user exist 
        const userExist = await User.findOne({email:email})
        if(userExist){
            res.status(422).json({message: "Este usuário ja existe"})
            return
        }


        // Criação do usuário 16/12/2024
        // Creat a password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // Creat a user
        const user = new User({
            name, 
            email,
            phone, 
            password: passwordHash
        })


        try {

            const newUser = await user.save()
            await CreateUserToken(newUser, req, res)
        } catch(error){
            res.status(500).json({message: error})
        }
        
    }

    static async login(req, res){
        const {email, password} = req.body 

        if(!email){
            res.status(422).json({message:"O email é obrigatório"})
            return 
        }

        if(!password){
            res.status(422).json({message:"A senha é obrigatória"})
            return 
        }

        const user = await User.findOne({email:email})
        if(!user){
            res.status(422).json({message:"Esse usuário não existe !"})
            return
        }

        // confirm password
        const passwordExist = await bcrypt.compare(password, user.password)
        if(!passwordExist){
            res.status(422).json({message:"Senha errada !"})
            return
        }

        // login with token
        await CreateUserToken(user, req, res)
    }

    static async checkUser(req, res){
        let currentUser 

        if(req.headers.authorization){
            const token = getToken(req) // VAI PEGAR O TOKEN VINDO DE GETTOKEN 
            const decoded = jwt.verify(token, "nossosecret") // VAI DECODIFICAR O TOKEN COM O SECRET
            currentUser = await User.findById(decoded.id) // VAI PROCURAR O USUARIO PELO ID
            currentUser.password = undefined // E ZERAR A SENHA POR MOTIVO DE SEGURANÇA
        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    static async getUserById(req, res){
        const id = req.params.id

        const user = await User.findById(id).select("-password")

        if(!user){
            res.status(422).json({message:"Usuário não encontrado!"})
            return
        }

        res.status(200).json({user})
    }

    static async editUser(req, res){
        res.status(200).json({message: "Update deu certo !"})
    }
}

export default UserController