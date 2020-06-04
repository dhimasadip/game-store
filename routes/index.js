const route = require('express').Router()
const UserRoute = require('./UserRoute')
const ProductRoute = require('./ProductRoute')
const CartRoute = require('./CartRoute')
const GameRoute = require('./GameRoute')

checkSession = (req,res,next) => {
    if(req.session.user) {
        next()
    } else {
        res.send('you\'re not login')
    }
}


route.get('/', (req,res) => {
    res.render('home')
})


route.use('/users', UserRoute)
route.use(checkSession)
route.use('/products', ProductRoute)
route.use('/carts', CartRoute)
route.use('/games', GameRoute)

module.exports = route