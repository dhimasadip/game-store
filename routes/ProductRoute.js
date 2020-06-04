const route = require('express').Router()
const ProductController = require('../controllers/ProductController')

route.get('/:gameId', ProductController.findOne)
route.get('/:gameId/:productId', ProductController.buyProduct)
route.post('/:gameId/:productId', ProductController.buyProductHandler)

module.exports = route