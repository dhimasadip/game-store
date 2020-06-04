const route = require('express').Router()
const ProductController = require('../controllers/ProductController')

// route.get('/', ProductController.list)
    route.get('/:id', ProductController.findOne)

module.exports = route