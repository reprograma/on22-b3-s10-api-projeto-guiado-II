const songsController = require('../controllers/songsController')
const express = require('express')
const router = express.Router() //função de rotas do express


router.get('/library', songsController.getAllSongs) 
router.get('/songs/:id', songsController.getSongById)
router.get('/artists', songsController.getByArtist)
router.post('/add', songsController.addSong)
router.put('/update/:id', songsController.updateSongById)
router.delete('/delete/:id', songsController.deleteById)
router.patch('/favorited/:id', songsController.updateFavById)


module.exports = router