const { Game, Product } = require('../models')

class GameController { 
  static findAll (req,res) {
    Game.findAll()
    .then(data => {
      res.render('dashboard', {data})
      })
  }
}

module.exports = GameController