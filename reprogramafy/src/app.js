const express = require("express") //importando o express
const app = express() // executo o express
app.use(express.json()) // uso o bodyparser

const songsRoutes = require("./routes/songsRoutes") //importando as músicas
app.use("/reprogramafy/playlist", songsRoutes) //criei uma rota raiz pro rotas

const podcastsRoutes = require("./routes/podcastsRoutes") //importando os podcasts
app.use("/reprogramafy/podcasts", podcastsRoutes) //criei uma rota raiz pro rotas podcasts


module.exports = app // exportando para usar o server.js