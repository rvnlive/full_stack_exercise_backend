const express = require('express')
const app = express()
const helmet = require('helmet')
const bodyParser = require('body-parser')
require('dotenv').config()

const userRoutes = require('./app/routes/userRoutes')
const favouriteRoutes = require('./app/routes/favouriteRoutes')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})
/** Postgres + Sequelize Connection */
const database = require('./app/config/database.config')
database.authenticate()
  .then(() => {
    console.log('Database connection Live!')
  })
  .catch(error => {
    console.log(error)
  })

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/auth', userRoutes)
app.use('/api/users', userRoutes)
app.use('/api/favourites', favouriteRoutes)

module.exports = app
