const songsController = require('../controllers/songsController');
const express = require('express');
const router = express.Router();

//router.metodoHttp(rota, função);

router.get('/library', songsController.getAllSongs); //ok

router.get('/songs/:id', songsController.getSong); //ok

router.get('/artists', songsController.getArtist); //ok

router.post('/add', songsController.addSong); //ok

router.put('/update/:id', songsController.updateSong); //ok

router.delete('/delete/:id', songsController.deleteSong); //ok

router.patch('/favorited/:id', songsController.updateFav); //ok

module.exports = router;