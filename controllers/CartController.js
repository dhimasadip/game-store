const { User, Cart, Product, Game } = require('../models')
const nodemailer = require("nodemailer")

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

        User.findOne({
            where: { email: req.session.user }
        })
        .then(data => {
            res.render('topup' , { data })
        })
        .catch(err => {
            res.send(err)
        })
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
        let dataUser

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
            return Game.findAll()
        })
        .then(data => {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: 'dhimasadip.dap@gmail.com',
                    pass: 'Simpleblue7'
                },
              });
            
            const mailOptions = {
                from: 'dhimasadip.dap@gmail.com',
                to: req.session.user,
                subject: 'Invoice',
                text: 'Your payment has been received.'
            } 

            transporter.sendMail(mailOptions, (err,info) => {
                if(err) {
                    res.send(err)
                } else {
                    // const msg = `Your payment has been received and the details has been sent to your email. Thank you!`
                    // res.render('invoice')
                    // res.render('dashboard', { data, msg })
                    
                    User.findOne({ where: { email: req.session.user}})
                    .then(data => {
                       
                        return Cart.findAll({
                            include: {
                                model: Product,
                                include: Game
                            },
                            where: { UserId: data.id }
                        })
                    })
                    .then(data => {
                        Cart.destroy({ where: { UserId: dataUser.id }})
                       
                        let grandTotal = 0
                        let grandTax = 0
                        let finalPrice = 0
                        data.forEach(el => {
                            grandTotal += el.total_price
                            grandTax += el.tax
                            finalPrice += (el.total_price + el.tax)
                        })

                        res.render('invoice', {data, grandTotal, grandTax, finalPrice})

                    })
                }
            })
            
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = CartController
