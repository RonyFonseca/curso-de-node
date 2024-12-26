import { where } from "sequelize"
import Task from "../models/Task.js"

export default class TaskController {
    static createTasks (req, res) {
        res.render('tasks/create')
    }
    static async showTasks (req, res){
        const task = await Task.findAll({raw:true})
        res.render('tasks/show', {task})
    }
    static async createTaskSave (req, res){

        const taskData = {
            title: req.body.title,
            description: req.body.description,
            done: false
        }

        await Task.create(taskData)
        res.redirect("/tasks/show")
    }

    static async delete (req, res){
        const id = req.body.id
        await Task.destroy({where: {id:id}})
        res.redirect("/tasks/show")
    }

    static async select (req, res){
        const id = req.body.id 
        const result = await Task.findOne({raw:true, where: {id:id}})

        res.render('tasks/editar', {result})
    }

    static async update (req, res){
        const id = req.body.id
        const Data = {
            title: req.body.title,
            description: req.body.description,
        }
        await Task.update(Data, {where: {id: id}})
        res.redirect('/tasks/show')
    }

    static async done (req, res){
        const id = req.body.id
        const toggle = {
            done: req.body.done === '0' ? true: false
        }

        await Task.update(toggle, {where: {id:id}})
        res.redirect("/tasks/show")
    }
}

