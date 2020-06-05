'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Cart extends Model {
    get getTotal() {
      return this.total_price + this.tax
    }

    
  }

  Cart.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    total_price: DataTypes.FLOAT,
    tax: DataTypes.FLOAT
  }, { sequelize });
  
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.User, { foreignKey: 'UserId', targetKey: 'id' })
    Cart.belongsTo(models.Product, { foreignKey: 'ProductId', targetKey: 'id' })
  };
  return Cart;
};