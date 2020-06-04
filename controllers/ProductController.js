const { Product, Game, Cart, User } = require('../models')
const { tax, totalPrice } = require('../helper')
const Sequelize = require('sequelize')

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
        let dataProduct, dataUser

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
            dataUser = data
            return Cart.findOne({
                where: Sequelize.and(
                    { UserId: data.id },
                    { ProductId: dataProduct.id}
                )
            })
        })
        .then(data => {
            const cart = {
                UserId: dataUser.id,
                ProductId: dataProduct.id,
                quantity: req.body.quantity,
                total_price: totalPrice(dataProduct.price, req.body.quantity),
                tax: tax(totalPrice(dataProduct.price, req.body.quantity)),
                createdAt: new Date(),
                updatedAt: new Date()
            } 

            if (data) {
                const cart_2 = {
                    quantity: (Number(data.quantity) + Number(req.body.quantity)),
                    total_price: (data.total_price + totalPrice(dataProduct.price, req.body.quantity)),
                    tax: (data.tax + tax(totalPrice(dataProduct.price, req.body.quantity)))
                }

                return Cart.update(cart_2, {
                    where: Sequelize.and(
                        { UserId: dataUser.id},
                        { ProductId: dataProduct.id}
                    )
                })
            } else {
                return Cart.create(cart)
            }
            
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