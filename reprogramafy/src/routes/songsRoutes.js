const songsController = require("../controllers/songsController"); //importo controller
const express = require("express"); //importa o express

const router = express.Router() //função de rotas do express

//router.medotodohttp(rota, função)
router.get("/library", songsController.getAllSongs); 
router.get("/songs/:id", songsController.getSongs);
router.get("/artists", songsController.getArtists); 
router.post("/add", songsController.addSong); 
router.put("/update/:id", songsController.updateSongs);
router.delete("/delete/:id", songsController.deleteSongs);
router.patch("/favorited/:id", songsController.updateFav);

module.exports = router
