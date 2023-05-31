const express = require("express"); // importa o express
const songsController = require("../controllers/songsController"); //importa o controller

const router = express.Router(); // função de rota do express

//router.metedo http(rota, funcao)
router.get("/library", songsController.getAllSongs);
// router.get("/songs/:id", songsController.getSong);
// router.get("/artists", songsController.getArtist);
// router.post("/add", songsController.addSong);
// router.put("/update/:id", songsController.updateSongs);
// router.delete("/delete/:id", songsController.deleteSong);
// router.patch("/favorited/id,", songsController.updateFav);

module.exports = router;
