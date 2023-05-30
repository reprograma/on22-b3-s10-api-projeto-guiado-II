// IMPORTS
const express = require('express')
const songRouter = require('./routes/songsRoutes')
const podcastRouter = require('./routes/podcastsRoutes')

// APP CONFIG
const app = express()
app.use(express.json())
app.use('/reprogramafy/playlist', songRouter)
app.use('/reprogramafy/podcasts', podcastRouter)

// EXPORTS
module.exports = app