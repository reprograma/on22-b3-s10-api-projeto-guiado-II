const express = require('express')
const app = express()

//body parse
app.use(express.json())

const podcastsRoutes = require('./routes/podcastsRoutes')
const songsRoutes = require('./routes/songsRoutes')


//main routes
app.use('/reprogramafy/podcasts', podcastsRoutes)
app.use('/reprogramafy/playlist', songsRoutes)


module.exports = app