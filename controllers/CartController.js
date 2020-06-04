const { User, Cart, Product, Game } = require('../models')

class CartController { 

    static userCart(req,res) {
        let balance

        User.findOne({
            where: {
                email: req.session.user
            }
        })
        .then(data => {
            balance = data.balance

            return Cart.findAll({
                include: {
                    model: Product,
                    include: Game
                },
                where: { UserId: data.id }
            })
        })
        .then(data => {
            data.forEach(el => balance -= el.total_price)
            if (balance < 0) {
                const msg = `Your balance is not enough`
                res.render('cart', { msg, data })
            } else {
                res.render('cart', { msg: null, data })
            }
        })
        .catch(err => {
            res.send(err)
        })
    }


    static topup(req,res) {
        res.render('topup')
    }


    static topupHandler(req,res) {
        const userUpdate = {
            balance: Number(req.body.topup)
        }

        User.findOne({
            where: { email: req.session.user }
        })
        .then(data => {
            userUpdate.balance += data.balance 
            return User.update(userUpdate, {
                where: { id: data.id }
            })
        })
        .then(data => {
            return Game.findAll()
        })
        .then(data => {
            res.render('dashboard', { msg: null, data })
        })
        .catch(err => {
            res.send(err)
        })
    }


    static payment(req,res) {
        let balanceNow, dataUser

        User.findOne({ where: { email: req.session.user }})
        .then(data => {
            dataUser = data

            return Cart.findAll({
                include: {
                    model: Product,
                    include: Game
                },
                where: { UserId: data.id }
            })
        })
        .then(data => {
            data.forEach(el => dataUser.balance -= el.total_price)

            const userUpdate = {
                balance: dataUser.balance
            }

            return User.update(userUpdate, {
                where: { id: dataUser.id}
            })
        })
        .then(data => {
            return Cart.destroy({ where: { UserId: dataUser.id }})
        })
        .then(data => {
            return Game.findAll()
        })
        .then(data => {
            const msg = `Your payment has been received and the details has been sent to your email. Thank you!`
            res.render('dashboard', { data, msg })
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = CartController