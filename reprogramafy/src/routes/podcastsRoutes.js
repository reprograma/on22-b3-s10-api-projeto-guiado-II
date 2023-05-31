// IMPORTS
const express = require('express')
const router = express.Router()
const podController = require('../controllers/podcastsController.js')

// ROUTES
router.post('/add', podController.addPodcast)
router.get('/library', podController.getAllPods)
router.get('/:name', podController.getPodByName)
router.get('/topic', podController.getPodByTopic)
router.put('/update/:id', podController.updatePod)
router.patch('/update-stars/:id', podController.updateStars)
router.delete('/delete/:id', podController.deletePod)

module.exports = router