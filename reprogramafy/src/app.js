const express = require ("express") //importa o express
const app = express () //executa o express
app.use (express.json())//uso o bodyparse

const songsRoutes = require ("./routes/songsRoutes")//importa as rotas de songs
app.use("/reprogramafy/playlist", songsRoutes)//definiu rota padrão para músicas

const podcastRoutes = require ("./routes/podcastsRoutes")//importa as rotas de podcast
app.use("/reprogramafy/podcasts",podcastRoutes)//definiu rota padrão para podcasts

module.exports = app