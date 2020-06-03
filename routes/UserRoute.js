const route = require('express').Router()
const UserController = require('../controllers/UserController')

route.get('/login', UserController.login)
route.get('/register', UserController.register)

module.exports = route