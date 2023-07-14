const controller = require("../controllers/podcastsController")
const express = require("express")
const router = express.Router()

router.get("/library", controller.getAllPods)
router.get("/library/topic", controller.getTopics)
router.post("/add", controller.addPods)
router.patch("/update/:id", controller.updatePods)
router.delete("/delete/:id", controller.deletePods)

module.exports = router;


//const controller = require("../controllers/podcastsController");

//const express = require("express");

// funcao de rotas de express
//const router = express.Router();

// router. metodo http (rota, funcao)

//router.get("/library", controller.getAllPods);
//router.get("/library/topic", controller.getTopics);
//router.post("/add", controller.addPods);
//router.patch("/update/:id", controller.atualizarPods);
//router.delete("/delete/:id", controller.deletePods);

//module.exports = router;