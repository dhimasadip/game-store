const { Product } = require('../models')

class ProductController { 
    static findOne (req,res) {
        Product.findAll({where : {GameId: req.params.id}})
        .then (data =>{
            res.render('product',{data})
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = ProductController