const express = require('express')
const app = express() // executa o express

app.use(express.json()) //uso o bodyparse q conecta um no outro

const songsRoutes = require('./routes/songsRoutes')
app.use('/reprogramafy/playlist', songsRoutes) // definiu rota padrão p musica

const podcastRoutes = require('./routes/podcastsRoutes')
app.use('/reprogramafy/podcasts', podcastRoutes)

module.exports = app


