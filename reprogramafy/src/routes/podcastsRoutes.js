const podcstController = require("../controllers/podcastsController");
const express = require("express");
const router = express.Router();

router.get("/library", podcstController.getAllPods);
router.get("/library/topic", podcstController.getTopics);
router.post("/add", podcstController.addPods);
router.patch("/update/:id", podcstController.updatePods);
router.delete("/delete/:id", podcstController.deletePods);

module.exports = router;