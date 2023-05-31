const podcastController = require("../controllers/podcastsController")
const express = require("express")
const router = express.Router()

router.get("/library", podcastController.getAllPods);
router.get("/library/topic", podcastController.getTopics);
// router.post("/add", podcastController.addPods);
// router.patch("/update/:id", podcastsController.updatePods);
// router.delete("/delete/:id", podcastsController.deletePods);

module.exports = router
