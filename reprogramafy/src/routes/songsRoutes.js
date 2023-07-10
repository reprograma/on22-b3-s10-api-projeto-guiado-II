const songsController = require("../controllers/songsController")//importa o controller
const express = require("express")// importa o express
const router = express.Router()// função de rotas do express

// router.método http(rota,função)
router.get("/library", songsController.getAllSongs); //ok
router.get("/songs/:id", songsController.getSong); // ok
router.get("/artists", songsController.getArtists); // ok
router.post("/add", songsController.addSong); // ok
router.put("update/:id", songsController.updateSong);// not ok
router.delete("/delete/:id", songsController.deleteSong);//ok
router.patch("/favorited/:id", songsController.updateFav);// ok

module.exports = router