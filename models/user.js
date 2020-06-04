'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  const bcrypt = require('bcrypt')

  class User extends Model {}

  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: false,
          msg: 'Wrong email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: 'password can\'t be empty'
        },
        len: {
          args: [8,16],
          msg: 'password must be 8 characters until 16 characters'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: 'name can\'t be empty'
        },
        min: {
          args: 2,
          msg: 'name must be at least 2 characters'
        }
      }
    },
    balance: DataTypes.FLOAT
  }, {
    hooks: {
      beforeCreate: (instance) => {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(instance.password, salt)

        instance.balance = 0
        instance.password = hash
        
      }
    }, 
    sequelize 
  });

  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Product, { through: 'Carts' })
  };
  return User;
};