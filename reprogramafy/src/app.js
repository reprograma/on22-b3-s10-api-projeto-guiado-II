const express = require('express')
const app = express()
const songRouter = require('./routes/songsRoutes')
const podcastRouter = require('./routes/podcastsRoutes')

app.use(express.json())
app.use('/songs', songRouter)
app.use('/podcasts', podcastRouter)

module.exports = app