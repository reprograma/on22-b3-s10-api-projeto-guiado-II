const songsController = require('../controllers/songsController') // importa o controler
const express= require('express')
const router = express.Router() // função de rota do express

router.get('/library', songsController.getAllSongs)
router.get('/songs/:id', songsController.getSongs)
router.get('/artists', songsController.getArtist)
router.post('/add', songsController.addSong)
router.put('/update/:id', songsController.updateSong)
router.delete('/delete/:id', songsController.deleteSong)
router.patch("/favorited/:id", songsController.updateFav)

module.exports = router