const songsController = require("../controllers/songsController") // importo o controller
const express = require("express") // importação do express
const router = express.Router() // função de rotas do express

// router. método http(rota, função)
router.get("/library", songsController.getAllSongs);
router.get("/songs/:id", songsController.getSong);
router.get("/artist", songsController.getArtist);
router.post("/add", songsController.addSong);
router.put("/update/:id", songsController.updateSong)
router.delete("/delete/:id", songsController.deleteSong)
router.patch("/favorited/:id", songsController.updateFav)

module.exports = router