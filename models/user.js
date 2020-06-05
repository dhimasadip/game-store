'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  const bcrypt = require('bcrypt')

  class User extends Model {
    get getBalance() {
      let str = String(this.balance)

      let counter = 1
      let result = []
      for (let i = str.length-1; i >= 0; i--) {
        if(counter == 3) {
          result.push(str[i])
          result.push('.')
          counter = 1
          continue
        }
        result.push(str[i])
        counter++
      }
      let hasil = result.reverse().join('')
      return hasil
    }

  }

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