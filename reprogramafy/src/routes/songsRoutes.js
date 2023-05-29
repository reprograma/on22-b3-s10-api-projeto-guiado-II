const songsController = require("../controllers/songsController")
const express = require("express")
const router = express.Router()//Funçao de rotas do express

//router.metodoHTTP(rota,funçao)

router.get("/library", songsController.getAllSongs);
router.get("/songs/:id", songsController.getSong);
router.get("/artists",songsController.getArtist);
router.post("/add", songsController.addSong);
router.put("/update/:id", songsController.updateSong);
router.delete("/delete/:id",songsController.deleteSong);
router.patch("/favorited/:id",songsController.updateFav);

module.exports = router