const express = require('express')
const app = express()
const songRoutes = require('./routes/songssRoutes')
const podcastRoutes = require('./routes/podcastsRoutes')

app.use(express.json())
app.use('/songs', songRoutes)
app.use('/podcasts', podcastRoutes)

module.exports = app