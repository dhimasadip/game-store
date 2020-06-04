'use strict';
const product = require('../product.json')

module.exports = {
  up: (queryInterface, Sequelize) => {
    product.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })

    return queryInterface.bulkInsert('Products', product, {});
   
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkDelete('Products', null, {});
   
  }
};
