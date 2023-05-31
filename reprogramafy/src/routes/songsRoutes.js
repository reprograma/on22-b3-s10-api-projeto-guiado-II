const songsController = require("../controllers/songsController") // importo controller
const express = require("express") // importa o express
const router = express.Router() // função de rotdas do express

// router.método http(rota, função)
router.get("/library", songsController.getAllSongs);
router.get("/songs/:id", songsController.getSong);
router.get("/artist", songsController.getArtists);
router.post("/add", songsController.addSong); 
router.put("/update/:id", songsController.updateSong);
router.delete("/delete/:id", songsController.deleteSong);
router.patch("/favorited/:id", songsController.updateFav);


module.exports = router 
