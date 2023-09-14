const Router = require('express')
const router = new Router()
const taskController = require('../controller/task.controller')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/tasks/add', taskController.createTask)
router.get('/tasks/today/:userId', taskController.todayTasks)
router.get('/user', taskController.getUsers)
router.get('/user/:id', taskController.getOneUser)

module.exports = router
