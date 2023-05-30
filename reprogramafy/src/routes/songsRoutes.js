const songsController = require("../controllers/songsController") //Importei controllers
const express =  require("express") //Importei express. Como não é pasta, não usei uma barra antes dele.
const router = express.Router() //Função de rotas do express

//router. método http(rota, função)
router.get("/library", songsController.getAllSongs); //rota get inicial pra mostrar todas as músicas
router.get("/song/:id", songsController.getSong); //rota get pra buscar o id
router.get("/artists", songsController.getArtist); //rota get pra buscar o artista
router.post("/add", songsController.addSong); //rota pra adicionar uma música
router.put("/update/:id", songsController.updateSong); //rota para atualizar 
router.delete("/delete/:id", songsController.deleteSong); //rota para deletar música
router.patch("/favorited/:id", songsController.updateFav); //rota para favoritar música

module.exports = router