const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');

const Transaction_type = sequelize.define('transaction_type', {
  name: Sequelize.STRING,
});

sequelize.sync()
  .then(() => Transaction_type.create({
    name: 'LOSS',
  }))
  .then(loss => {
    console.log(loss.toJSON());
  });
