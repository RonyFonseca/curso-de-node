import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//Helpers
import createUserToken from "../helpers/create-user-token.js"
import getToken from "../helpers/get-token.js"

class UserController{
    static async register(req, res){
        const {name, phone, email, password, confirmPassword} = req.body 

        //VALIDATIONS
        if(!name){
            res.status(422).json({message:"The name field is empty!"})
            return 
        }
        if(!phone){
            res.status(422).json({message:"The phone field is empty!"})
            return 
        }
        if(!email){
            res.status(422).json({message:"The email field is empty!"})
            return 
        }
        if(!password){
            res.status(422).json({message:"The password field is empty!"})
            return 
        }
        if(!confirmPassword){
            res.status(422).json({message:"The confirm password field is empty!"})
            return 
        }
        if(password !== confirmPassword){
            res.status(422).json({message:"The field password is different from the confirmation of password field!"})
            return 
        }
        
        const UserExist = await User.findOne({email:email})
        if(UserExist){
            res.status(422).json({message:"This user already exist!"})
            return 
        }

        //Creating the password 
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //Creating the user
        const user = new User({
            name: name, 
            email: email, 
            password: passwordHash,
            phone: phone
        })

        try {
            const newUser = await user.save()
            await createUserToken(newUser, req, res)
        }catch(error){
            res.status(500).json({message: error})
        }
    }

    static async login(req, res){
        const {email, password} = req.body 

        if(!email){
            res.status(422).json({message:"The email field is empty!"})
            return 
        }
        if(!password){
            res.status(422).json({message:"The password field is empty!"})
            return
        }

        // Exist user 
        const user = await User.findOne({email:email})
        if(!user){
            res.status(422).json({message:"This user not exist"})
            return
        }
        
        // Check password
        const confirmPasswordDb = await bcrypt.compare(password, user.password)
        if(!confirmPasswordDb){
            res.status(422).json({message:"Invalid password!"})
            return
        }

        await createUserToken(user, req, res)
    }

    static async checkUser(req, res){
        let currentUser

        if(req.headers.authorization){
            const token = getToken(req)
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

            const user = await User.findById(decodedToken.id).select("-password")

            currentUser = user
        }else{
            currentUser = null
        }
        res.status(200).send(currentUser)
    }

    static async getUserById(req, res){
        const id = req.params.id

        const user = await User.findById(id).select("-password")

        if(!user){
            res.estatus(422).json({message: "User not found !"})
            return 
        }

        res.status(200).json({user})
    }
}

export default UserController