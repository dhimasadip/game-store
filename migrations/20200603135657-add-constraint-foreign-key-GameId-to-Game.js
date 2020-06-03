'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Products', ['GameId'], {
      type: 'foreign key',
      name: 'custom_fkey_GameId',
      references: {
        table: 'Games',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Products', 'custom_fkey_GameId', {});
  }
};
