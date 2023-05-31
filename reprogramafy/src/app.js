const express = require('express')
const app = express() //executando express
app.use(express.json()) //usando o body Parse

const songsRoutes = require('./routes/songsRoutes') //importa rotas de song
app.use('/reprogramafy/playlist', songsRoutes) //definindo rota padrão para songs

const podcastsRoutes = require('./routes/podcastsRoutes') //importa rotas de podcasts
app.use('/reprogramafy/podcasts', podcastsRoutes) //definindo rota padrão para podcasts

module.exports = app