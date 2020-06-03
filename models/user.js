'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class User extends Model {}

  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    balance: DataTypes.FLOAT
  }, { sequelize });

  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Product, { through: 'Carts' })
  };
  return User;
};