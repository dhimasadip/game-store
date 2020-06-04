const route = require('express').Router()
const CartController = require('../controllers/CartController')

checkSession = (req,res,next) => {
    if(req.session.user) {
        next()
    } else {
        res.send('you\'re not login')
    }
}

route.get('/dashboard', checkSession, CartController.dashboard)

module.exports = route