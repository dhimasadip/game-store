const { Product, Game, Cart, User } = require('../models')
const { tax, totalPrice } = require('../helper')

class ProductController { 
    static findOne (req,res) {
        Product.findAll({where : {GameId: req.params.gameId}})
        .then (data =>{
            res.render('product',{data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static buyProduct(req, res) {
        Product.findOne({
            include: Game,
            where: {
                id: req.params.productId
            }
        })
        .then(data => {
            res.render('buyProduct', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static buyProductHandler(req, res) {
        let dataProduct

        Product.findOne({
            where: {
                id: req.params.productId
            }
        })
        .then(data => {
            dataProduct = data
            return User.findOne({
                where: {
                    email: req.session.user
                }
            })
            
        })
        .then(data => {
            const cart = {
                UserId: data.id,
                ProductId: dataProduct.id,
                total_price: totalPrice(dataProduct.price, req.body.quantity),
                tax: tax(totalPrice(dataProduct.price, req.body.quantity)),
                createdAt: new Date(),
                updatedAt: new Date()
            } 

            return Cart.create(cart)
        })
        .then(data => {
            return Game.findAll()
        })
        .then(data => {
            const msg = `Successfully add product to cart.`
            res.render('dashboard', {msg, data})
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = ProductController