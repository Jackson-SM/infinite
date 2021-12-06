const Sequelize = require('Sequelize');
const sequelize = new Sequelize('pratic', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
})

const Usuarios = sequelize.define('usuarios', {
  login: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.TEXT
  },
  email: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  }
})

module.exports = Usuarios