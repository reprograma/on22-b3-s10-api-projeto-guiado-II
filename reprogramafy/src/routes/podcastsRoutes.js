const podcastsController = require('../controllers/podcastsController')
const express = require('express')
const router = express.Router()

//Router. metodo http(rota, função)
router.get('/libery', podcastsController.getAllPods);
router.get('/libery/topic', podcastsController.getTopics);
router.post('/add', podcastsController.addPods);
//router.patch('/update/:id', podcastsController.updatePods);
//router.delete('/delete/:id', podcastsController.deletePods);

module.exports = router