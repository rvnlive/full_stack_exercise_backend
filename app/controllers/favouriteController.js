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
          model: Books, as: 'books'
        }]
      })
      .then((result) => {
        const favouriteBook = result
        // console.log(favouriteBook)
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
          model: Movies, as: 'movies'
        }]
      })
      .then((result) => {
        const favouriteMovie = result
        // console.log(favouriteMovie)
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

exports.getFavouriteMovies = (req, res) => {
  const userID = req.body.activeUserID
  Favourites.findAll({
    where: {
      user_id: userID
    },
    attributes: {
      exclude: ['user_id', 'created_at', 'updated_at', 'favourite_id']
    },
    include: [
      {
        model: Movies,
        as: 'movies',
        required: false,
        order: [['created_at', 'ASC']],
        attributes: {
          exclude: ['created_at', 'updated_at', 'favourite_movie_id']
        }
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

exports.getFavouriteBooks = (req, res) => {
  const userID = req.body.activeUserID
  Favourites.findAll({
    where: {
      user_id: userID
    },
    attributes: {
      exclude: ['user_id', 'created_at', 'updated_at']
    },
    include: [
      {
        model: Books,
        as: 'books',
        required: false,
        order: [['created_at', 'ASC']],
        attributes: {
          exclude: ['created_at', 'updated_at']
        }
      }]
  })
    .then(favourites => {
      if (!favourites) {
        errorMessage.error = 'Add something to favourites'
        return res.status(status.bad).send(errorMessage)
      } else {
        // console.log(favourites)
        return res.json(favourites)
      }
    })
    .catch(error => console.log('Operation was not successful ' + error))
}

exports.removeFromFavourites = (req, res) => {
  const favouriteID = req.body.favouriteID
  const userID = req.body.activeUserID
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
