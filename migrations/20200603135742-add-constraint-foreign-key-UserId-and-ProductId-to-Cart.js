'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Carts', ['UserId'], {
      type: 'foreign key',
      name: 'custom_fkey_UserId',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
      .then(() => {
        return queryInterface.addConstraint('Carts', ['ProductId'], {
          type: 'foreign key',
          name: 'custom_fkey_ProductId',
          references: {
            table: 'Products',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        });  
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Carts', 'UserId', {})
      .then(() => {
        return queryInterface.removeConstraint('Carts', 'ProductId', {})
      })
  }
};
