const podcastController = require('../controllers/podcastsController')
const express = require('express')
const router = express.Router()

router.get('/library', podcastController.getAllPods);
router.get('/library/topic', podcastController.getTopics);
router.post('/add', podcastController.addPods);
router.patch('/update/:id', podcastController.updatePods);
router.delete('/delete/:id', podcastController.deletePods);

module.exports = router