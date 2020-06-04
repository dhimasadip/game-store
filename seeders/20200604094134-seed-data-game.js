'use strict';
const game = require('../game.json')

module.exports = {
  up: (queryInterface, Sequelize) => {
    game.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })

    return queryInterface.bulkInsert('Games', game, {});
   
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkDelete('Games', null, {});
   
  }
};
