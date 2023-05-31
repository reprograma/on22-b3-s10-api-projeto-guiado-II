const songsController = require("../controllers/songsController"); // importa o controller
const express = require("express");
const router = express.Router(); //função de rota do express

// router. metódo http(rota , função)//
router.get("/library", songsController.getAllSongs);
router.get("/songs/:id", songsController.getSongId);
router.get("/artist", songsController.getArtist);
router.post("/add", songsController.addSong);
router.put("/update/:id", songsController.updateSong);
router.delete("/delete/:id", songsController.deleteSong);
router.patch("/favorited/:id", songsController.updateFav);

module.exports = router;