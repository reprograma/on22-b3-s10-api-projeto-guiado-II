const controllerPodcasts = require("../controllers/podcastsController")
const express = require("express")
const router = express.Router()


router.get("/library",controllerPodcasts.getAllPodcasts)
router.get("/library/topic",controllerPodcasts.getTopics)
router.post("/add",controllerPodcasts.addPodcasts)
router.patch("/change/:id",controllerPodcasts.updatePodcasts)
router.delete("/delete/:id",controllerPodcasts.deletePodcasts)


module.exports = router