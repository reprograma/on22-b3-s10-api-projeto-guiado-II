// IMPORTS
const express = require('express')
const router = express.Router()
const songController = require('../controllers/songsController.js')

// ROUTES
router.post('/add', songController.addSong)
router.get('/library', songController.getAllSongs)
router.get('/songs/:id', songController.getSongById)
router.get('/artists', songController.getByArtists)
router.put('/update/:id', songController.updateSong)
router.patch('/update-fav/:id', songController.updateFav)
router.delete('/delete/:id', songController.deleteSong)

// EXPORTS
module.exports = router