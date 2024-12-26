import { where } from "sequelize"
import User from "../models/User.js"
import bcrypt from "bcrypt"

class authController {
    static login (req, res){
        res.render("auth/login")
    }

    static async loginPost (req, res){
        const {email, password} = req.body 

        //exist 
        const user = await User.findOne({where: {email:email}})
        

        if(!user){
            req.flash("message", "Usuário não encontrado")
            res.render("auth/login", { message: req.flash("message") })

            return
        }
        // check password
        const pass = bcrypt.compareSync(password, user.password)

        if(!pass){
            req.flash("message", "Senha inválida!")
            res.render("auth/login", { message: req.flash("message") })

            return
        }

        try {
            req.session.UserId = user.id
            req.session.Name = user.name

            req.session.save(()=>{
                res.redirect("/")
            })

        }catch(error){
            console.log(error)
        }
    }

    static register (req, res){
        res.render("auth/register")
    }

    static async registerPost (req, res){
        const {email, name, password, confirmpassword} = req.body 

        //password validation 
        if (password != confirmpassword){
            //mensagem flash
            req.flash("message", "As senhas não conferem, tente novamente")
            res.render("auth/register", { message: req.flash("message") })
            return
        }

        //check if user exist
        const exist = await User.findOne({where: {email:email}})
        if (exist){
            req.flash("message", "O email ja está sendo usado")
            res.render("auth/register", { message: req.flash("message") })

            return
        }

        //creat a password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hash,
        }

        try {
            const usuario = await User.create(user)

            req.session.UserId = usuario.id

            req.session.save(() => {
                res.redirect('/')
            })

        }catch(err){
            console.log(err)
        }
    }
    
    static logout(req, res){
        req.session.destroy()
        res.redirect("/login")
    }
}

export default authController