const songsController = require("../controllers/songsController"); // importa o controller

const express = require("express"); // importa o express


const router = express.Router(); // funcao de rotas de express

 //router. metodo http (rota, funcao)

router.get("/library", songsController.getAllSongs);
router.get("/songs/:id", songsController.getSongs);
router.get("/artists", songsController.getArtist);
router.post("/add", songsController.addSong);
router.put("/:id", songsController.updateSongs);
router.delete("/delete/:id", songsController.deleteSongs);
router.patch("/favorited/:id", songsController.updateFav);

module.exports = router;

