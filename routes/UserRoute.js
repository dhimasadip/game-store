const route = require('express').Router()
const UserController = require('../controllers/UserController')

route.get('/login', UserController.login)
route.post('/dashboard', UserController.loginHandler)
route.get('/register', UserController.register)
route.post('/register', UserController.registerHandler)
route.get('/logout', UserController.logout)

module.exports = route