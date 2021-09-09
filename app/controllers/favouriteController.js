const {
  errorMessage, status
} = require('../helpers/status')

const initModels = require('../models/init-models').initModels
const sequelize = require('../config/database.config')
console.log(initModels)
const models = initModels(sequelize)
const Users = models.users
const Favourites = models.favourites
const Books = models.books
const Movies = models.movies

/// /////////////////////////////////////////// //

exports.addToFavourites = (req, res) => {
  const userID = req.body.activeUserID
  const bookID = req.body.bookID
  const movieID = req.body.movieID

  if (userID && bookID) {
    const addBook = {
      user_id: userID,
      books: [{
        book_id: bookID
      }]
    }
    Favourites
      .create(addBook, {
        include: [{
          model: Books, as: 'book'
        }]
      })
      .then((result) => {
        const favouriteBook = result
        console.log(favouriteBook)
        if (favouriteBook) {
          return res.json({ favouriteBook })
        } else {
          errorMessage.error = 'Something went wrong!'
          return res.status(status.conflict).send(errorMessage)
        }
      })
      .catch(error => console.log('Operation was not successful ' + error)
      )
  } else if (userID && movieID) {
    const addMovie = {
      user_id: userID,
      movies: [{
        movie_id: movieID
      }]
    }
    Favourites
      .create(addMovie, {
        include: [{
          model: Movies, as: 'movie'
        }]
      })
      .then((result) => {
        const favouriteMovie = result
        console.log(favouriteMovie)
        if (favouriteMovie) {
          return res.json({ favouriteMovie })
        } else {
          errorMessage.error = 'Something went wrong!'
          return res.status(status.conflict).send(errorMessage)
        }
      })
      .catch(error => console.log('Operation was not successful ' + error)
      )
  }
}

exports.getAllFavourites = (req, res) => {
  Favourites.findAll({
    include: [
      {
        model: Users,
        as: 'user',
        attributes: {
          exclude: ['user_password', 'created_at', 'updated_at']
        },
        order: [['created_at', 'ASC']]

      },
      {
        model: Books,
        as: 'book',
        order: [['created_at', 'ASC']]
      },
      {
        model: Movies,
        as: 'movie',
        order: [['created_at', 'ASC']]
      }]
  })
    .then(favourites => {
      if (!favourites) {
        errorMessage.error = 'Add something to favourites'
        return res.status(status.bad).send(errorMessage)
      } else {
        return res.json(favourites)
      }
    })
    .catch(error => console.log('Operation was not successful ' + error))
}

exports.removeFromFavourites = (req, res) => {
  const favouriteID = req.body.favouriteid
  const userID = req.body.userid
  Favourites.destroy({
    where: { user_id: userID, favourite_id: favouriteID },
    include: [
      {
        model: Books,
        as: 'book',
        order: [['created_at', 'ASC']]
      },
      {
        model: Movies,
        as: 'movie',
        order: [['created_at', 'ASC']]
      }
    ]
  })
    .then((result) => {
      console.log(result)
      const successMessage = 'Removed Successfully'
      return res.status(status.success).send(successMessage)
    })
    .catch(error => console.log('Operation was not successful ' + error))
}
