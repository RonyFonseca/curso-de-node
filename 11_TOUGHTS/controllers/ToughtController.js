import Tought from "../models/Tought.js"
import User from "../models/User.js"
import {Op} from "sequelize"

class ToughtController {
    static async showToughts(req, res) {

        let search = ''

        if(req.query.search){
            search= req.query.search
        }

        let order = 'DESC'

        if(req.query.order=="old"){
            order = "ASC"
        }else {
            order = "DESC"
        }

        const toughts = await Tought.findAll({include: User, where: {title: {[Op.like]: `%${search}%`}}, order:[['createdAt', order]]})

        let toughtsQty = toughts.length

        if(toughtsQty==0){
            toughtsQty = false
        }

        res.render("toughts/home", {toughts, search, toughtsQty})
    }

    static async dashboard (req, res){

        const id = req.session.UserId

        const user = await User.findOne({where:{id:id}, include: Tought, plain: true})

        // console.log(user.Toughts.map((e)=> e.dataValues))
        //const toughts = user.Toughts.map((result)=> {result.dataValues})
                        //user.Toughts.map((e)=> e.dataValues
        //console.log(toughts)
        //console.log(toughts)
        const toughts = user.Toughts.map((e)=> e.dataValues)
        let emptyToughts = false

        if(toughts.length == 0 ) {
            emptyToughts= true
        }

        res.render("toughts/dashboard",{toughts, emptyToughts})
    }

    static async edit(req, res){
        const id = req.params.id
        const tought = await Tought.findOne({where:{id:id}, raw: true})

        res.render('toughts/edit', {tought})
    }

    static async editSave(req, res){
        const id = req.body.id
        const tought ={
            title: req.body.title
        }

        try{
            await Tought.update(tought, {where: {id:id}})
            req.flash("message", "Pensamento atualizado com sucesso");
        
            req.session.save(() => {
                res.redirect("/toughts/dashboard");
        });
        }catch(error){console.log(`Deu erro:${error}`)}
    }

    static creatTought(req, res){
        res.render("toughts/create")
    }

    static async creatToughtPost(req, res){

        try {
            const title = req.body.title;
            const UserId = req.session.UserId;
    
            // Verificação do UserId
            if (!UserId) {
                req.flash("message", "Usuário não autenticado");
                return res.redirect("/login"); // Redireciona se o usuário não estiver logado
            }
    
            const Data = {
                title,
                UserId
            };
    
            await Tought.create(Data);
    
            req.flash("message", "Pensamento criado com sucesso");
    
            req.session.save(() => {
                res.redirect("/toughts/dashboard");
            });
        } catch (err) {
            console.log(err);
        }

    }

    static async remove(req,res) {
        const id = req.body.id
        const UserId = req.session.UserId

        try{
            await Tought.destroy({where:{id:id}, UserId:UserId})

            req.flash("message", "Pensamento removido com sucesso");
    
            req.session.save(() => {
                res.redirect("/toughts/dashboard");
            });

        }catch(error){console.log(`Deu erro:${error}`)}
    }
}
export default ToughtController