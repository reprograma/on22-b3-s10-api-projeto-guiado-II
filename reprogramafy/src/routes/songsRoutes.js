const songsController = require('../controllers/songsController') //importando controller
const express = require('express') //importanto express
const router = express.Router() //função de rotas do express

//Router. metodo http(rota, função)

//router.get('/libary', songsController.getAllSong); //Definindo rota
//router.get('/songs/:id', songsController.getSong);
//router.get('/artists', songsController.getArtist);
//router.post('/add', songsController.addSong);
//router.put('/update/:id', songsController.updateSong);
//router.delete('/delete/:id', songsController.deleteSong);
//router.patch('/favorited/:id', songsController.updateFav);

module.exports = router