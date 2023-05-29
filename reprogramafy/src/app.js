const express = require('express')

const app = express()
app.use(express.json())

const songRouter = require('./routes/songsRoutes')
app.use('/reprogramafy/playlist', songRouter)

const podcastRouter = require('./routes/podcastsRoutes')
app.use('/reprogramafy/podcasts', podcastRouter)

module.exports = app