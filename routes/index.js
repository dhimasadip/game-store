const route = require('express').Router()
const UserRoute = require('./UserRoute')
const ProductRoute = require('./ProductRoute')
const CartRoute = require('./CartRoute')
const GameRoute = require('./GameRoute')

route.get('/', (req,res) => {
    res.render('home')
})

route.use('/users', UserRoute)
route.use('/products', ProductRoute)
route.use('/carts', CartRoute)
route.use('/games', GameRoute)

module.exports = route