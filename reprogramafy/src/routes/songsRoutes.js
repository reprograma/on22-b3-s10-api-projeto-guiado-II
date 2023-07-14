const controller = require("../controllers/songsController")
const express = require("express")
const router = express.Router()

router.get("/library", controller.getAllSongs)
router.get("/songs/:id", controller.getSong)
router.get("/artists/:", controller.getArtist)
router.post("/add", controller.addSong)
router.put("/update/:id", controller.updateSong)
router.delete("/delete/:id", controller.deleteSong)
router.patch("/favorited/:id", controller.updateFav)

module.exports = router










//const controller = require("../controllers/songsController");

//const express = require("express");

// funcao de rotas de express
//const router = express.Router();

// router. metodo http (rota, funcao)

//router.get("/library", controller.getAllMusic);
//router.get("/library/:id", controller.getMusic);
//router.get("/artists", controller.getArtist);
//router.post("/add", controller.addMusic);
//router.put("/:id", controller.updateMusic);
//router.delete("/delete/:id", controller.deleteMusic);
//router.patch("/favorited/:id", controller.updateFav);

//module.exports = router;

