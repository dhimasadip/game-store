const { User, Product, Cart, Game } = require('../models')
const bcrypt = require('bcrypt')

class UserController {
    static login(req,res) {
        res.render('user/login-form')
    }

    static loginHandler(req,res) {
        const user = {
            email: req.body.email,
            password: req.body.password
        }

        let dataUser
        
        User.findOne({
            where: {
                email: user.email
            }
        })
            .then(data => {
                if(!data) {
                    res.send('email not found')
                } else {
                    if(bcrypt.compareSync(user.password, data.password)) {
                        req.session.user = user.email
                        dataUser = data
                        return Game.findAll()
                        
                    } else {
                        res.send('wrong password')
                    }
                }
            })
            .then(data => {

                res.render('dashboard', { msg: null, dataUser, data })
            })
            .catch(err => {
                res.send(err)
            })

    }

    static register(req,res) {
        res.render('user/register-form')
    }

    static registerHandler(req,res) {
        const user = {
            email: req.body.email,
            password: req.body.confirm_password,
            name: req.body.name,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        User.create(user)
            .then(data => {
                res.redirect('/users/login')
            })
            .catch(err => {
                if(err.errors) {
                    let errData = err.errors.map(el => el.message)
                    res.send(errData)
                } else {
                    res.send(err)
                }
            })
        
    }

    static logout(req,res) {
        req.session.destroy(err => {
            if (err) {
                res.send(err)
            } else {
                res.redirect('/')
            }
        })
    }


}

module.exports = UserController