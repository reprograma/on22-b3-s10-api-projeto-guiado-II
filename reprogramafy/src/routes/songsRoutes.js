const express = require('express')
const songsRouter = express.Router()
const songsController = require('../controllers/songsController.js')

songsRouter.post('/url', songsController.get)
songsRouter.get('/url', songsController.get)
songsRouter.get('/url', songsController.get)
songsRouter.get('/url', songsController.get)
songsRouter.delete('/url', songsController.get)
songsRouter.put('/url', songsController.get)
songsRouter.patch('/url', songsController.get)

module.exports = songRouter