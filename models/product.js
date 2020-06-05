'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Product extends Model {
    get getTax() {
      return this.price * 0.1
    }
  }

  Product.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    price: DataTypes.FLOAT,
    GameId: DataTypes.INTEGER
  }, { sequelize });

  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsToMany(models.User, { through: 'Carts' })
    Product.belongsTo(models.Game, { foreignKey: 'GameId', targetKey: 'id' })

  };
  return Product;
};