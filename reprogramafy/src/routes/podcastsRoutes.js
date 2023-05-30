const podcastsController = require('../controllers/podcastsController')
const express = require('express')
const router = express.Router()


router.get('/library', podcastsController.getAllPods)
router.get('/library/topic', podcastsController.getByTopic)
router.post('/add', podcastsController.addPods)
router.patch('/update/:id', podcastsController.updatePodById)
router.delete('/delete/:id', podcastsController.deletePodById)


module.exports = router