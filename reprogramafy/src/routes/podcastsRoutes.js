const podcastsController = require("../controllers/podcastsController")
const express = require("express")
const router = express.Router()

router.get("/library", podcastsController.getAllPods); //Crou uma rota get para mostar todos os pods
router.get("/topic", podcastsController.getTopics); //Criei uma rota para pegar um Pod por tópico
router.post("/add", podcastsController.addPods); //Criei uma  rota para adicionar um pod
router.patch("/update/:id", podcastsController.updatePods) //Criei uma rota para atulizar o pod
router.delete("/delete/:id", podcastsController.deletePods); //Criei uma rota para deletar um pod

module.exports = router