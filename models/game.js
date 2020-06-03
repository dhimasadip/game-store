'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Game extends Model {}

  Game.init({
    name: DataTypes.STRING
  }, { sequelize });
  
  Game.associate = function(models) {
    // associations can be defined here
    Game.hasMany(models.Product, { foreignKey: 'GameId', targetKey: 'id'})
  };
  return Game;
};