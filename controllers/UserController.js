const { User, Product, Cart } = require('../models')

class UserController {
    static login(req,res) {
        res.render('user/login-form')
    }

    static register(req,res) {
        res.render('user/register-form')
    }

}

module.exports = UserController