const podcastsController = require("../controllers/podcastsController")
const express = require("express")
const router = express.Router()

router.get("/library", podcastsController.getAllPods); //ok
router.get("/library/topic", podcastsController.getTopics); //ok
router.post("/add", podcastsController.addPods) //ok
router.patch("/update/:id", podcastsController.updatePods)// ok
router.delete("/delete/:id", podcastsController.deletePods)//ok

module.exports = router
