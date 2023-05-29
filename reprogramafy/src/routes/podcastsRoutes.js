const express = require('express')
const router = express.Router()
const podcastController = require('../controllers/podcastsController.js')

router.post('/add', podcastController.addPodcast)
router.get('/library', podcastController.getAllPods)
router.get('/library/topic', podcastController.getTopics)
router.patch('/update/:id', podcastController.updatePodcast)
router.delete('/delete/:id', podcastController.deletePodcast)

module.exports = router