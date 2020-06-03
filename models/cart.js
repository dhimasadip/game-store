'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    total_price: DataTypes.FLOAT,
    tax: DataTypes.FLOAT
  }, {});
  Cart.associate = function(models) {
    // associations can be defined here
  };
  return Cart;
};