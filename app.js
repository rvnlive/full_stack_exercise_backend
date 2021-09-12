const express = require('express')
const app = express()
const helmet = require('helmet')
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require('cors')

const userRoutes = require('./app/routes/userRoutes')
const favouriteRoutes = require('./app/routes/favouriteRoutes')

const allowedOrigins = 'https://synthetix-exercise.herokuapp.com/'
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true)
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.'
      return callback(new Error(msg), false)
    }
    return callback(null, true)
  }
}))
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
