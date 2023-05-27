const express = require('express')
const podcastRouter = express.Router()
const podcastController = require('../controllers/podcastsController.js')

podcastRouter.post('/url', podcastController.get)
podcastRouter.get('/url', podcastController.get)
podcastRouter.get('/url', podcastController.get)
podcastRouter.delete('/url', podcastController.get)
podcastRouter.patch('/url', podcastController.get)

module.exports = podcastRouter