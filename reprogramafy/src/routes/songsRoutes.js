const controllerSongs = require("../controllers/songsController") // importa o controller
const express = require("express") // import o express
const router = express.Router()  // função de rotas do express

router.get("/library",controllerSongs.getAllSongs)
router.get("/songs/:id",controllerSongs.getSongsById)
router.get("/artists",controllerSongs.getArtists)
router.post("/add",controllerSongs.addSong)
router.put("/update/:id",controllerSongs.updateSong)
router.delete("/delete/:id",controllerSongs.deleteSong)
router.patch("/favorited/:id",controllerSongs.updateFav)

module.exports = router
