const express = require('express')
const router = express.Router()
const auth = require('../helpers/authorization')

const favouriteController = require('../controllers/favouriteController')

router.post('/books', auth, favouriteController.getFavouriteBooks)
router.post('/movies', auth, favouriteController.getFavouriteMovies)
router.post('/add', auth, favouriteController.addToFavourites)
router.delete('/remove', auth, favouriteController.removeFromFavourites)

module.exports = router
