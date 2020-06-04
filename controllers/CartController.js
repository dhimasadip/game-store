const { Cart } = require('../models')

class CartController { 

    static dashboard(req,res) {
        res.render('cart/dashboard')
    }
}

module.exports = CartController