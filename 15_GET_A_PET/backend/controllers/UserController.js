import User from "../models/User.js"
import bcrypt from "bcrypt"

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
            res.status(201).json({message: "Creation was a success !", newUser})
        }catch(error){
            res.status(500).json({message: error})
        }
    }
}

export default UserController