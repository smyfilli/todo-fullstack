const Router = require('express')
const router = new Router()
const controller = require('../controller/auth.controller')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/registration',[
    check('name', "Имя пользователя не может быть пустым").notEmpty(),
    check('surname', "Фамилия пользователя не может быть пустой").notEmpty(),
    check('login', "Логин пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
], controller.registration)
router.post('/login', controller.login)
router.get('/users',roleMiddleware(["ADMIN"]), controller.getUsers)

module.exports = router