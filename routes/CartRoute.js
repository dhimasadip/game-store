const route = require('express').Router()
const CartController = require('../controllers/CartController')

route.get('/', CartController.userCart)
route.get('/top-up', CartController.topup)
route.post('/top-up', CartController.topupHandler)
route.get('/payment', CartController.payment)

module.exports = route