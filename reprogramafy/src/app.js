const express = require('express') // importa express
const app = express() // executa exprss
app.use(express.json()) //usa o bodyparser

const songsRoutes = require('./routes/songsRoutes')// importa as rotas de songs
app.use('/reprogramafy/playlist', songsRoutes) // define rota padrao para songs

const podcastsRoutes = require('./routes/podcastsRoutes')// importa as rotas de podcasts
app.use('/reprogramafy/podcasts', podcastsRoutes)

module.exports = app // exporta 
