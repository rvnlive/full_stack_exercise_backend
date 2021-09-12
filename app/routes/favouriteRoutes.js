const express = require('express')
const router = express.Router()
const auth = require('../helpers/authorization')

const favouriteController = require('../controllers/favouriteController')

router.get('/books', auth, favouriteController.getFavouriteBooks)
router.get('/movies', auth, favouriteController.getFavouriteMovies)
router.post('/add', auth, favouriteController.addToFavourites)
router.delete('/remove', auth, favouriteController.removeFromFavourites)

module.exports = router
