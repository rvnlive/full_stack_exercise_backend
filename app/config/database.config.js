// Promise-based Object-relational mapping
const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  })

module.exports = sequelize
