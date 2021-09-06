const DataTypes = require('sequelize').DataTypes
const _users = require('./userModel')
const _favourites = require('./favouriteModel')
const _books = require('./bookModel')
const _movies = require('./movieModel')

function initModels (sequelize) {
  const users = _users(sequelize, DataTypes)
  const favourites = _favourites(sequelize, DataTypes)
  const books = _books(sequelize, DataTypes)
  const movies = _movies(sequelize, DataTypes)

  // Association for FAVOURITES
  favourites.belongsTo(users, { as: 'user', foreignKey: 'user_id' })
  users.hasMany(favourites, { as: 'favourites', foreignKey: 'user_id' })

  // Association for BOOKS
  books.belongsTo(favourites, { as: 'book', foreignKey: 'favourite_id' })
  favourites.hasMany(books, { as: 'books', foreignKey: 'favourite_id' })

  // Association for MOVIES
  movies.belongsTo(favourites, { as: 'movie', foreignKey: 'favourite_id' })
  favourites.hasMany(movies, { as: 'movies', foreignKey: 'favourite_id' })

  return {
    users,
    favourites,
    books,
    movies
  }
}
module.exports = initModels
module.exports.initModels = initModels
module.exports.default = initModels
