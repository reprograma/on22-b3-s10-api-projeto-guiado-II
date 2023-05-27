const express = require('express')
const songRouter = express.Router()
const songController = require('../controllers/songController.js')

songRouter.post('/url', songController.get)
songRouter.get('/url', songController.get)
songRouter.get('/url', songController.get)
songRouter.get('/url', songController.get)
songRouter.delete('/url', songController.get)
songRouter.put('/url', songController.get)
songRouter.patch('/url', songController.get)

module.exports = songRouter