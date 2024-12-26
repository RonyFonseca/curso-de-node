import express from 'express'
import TaskController from '../controllers/TaskController.js'

const router = express.Router()

router.get('/add', TaskController.createTasks)//redenriza a pagina de criação, form

router.get('/show', TaskController.showTasks)//mostrar na tela todas as tasks

router.post('/create', TaskController.createTaskSave)//postar o conteúdo no banco de dados

router.post('/delete', TaskController.delete)

router.post('/select', TaskController.select)

router.post('/update', TaskController.update)

router.post('/finalizarTarefa', TaskController.done)

export default router