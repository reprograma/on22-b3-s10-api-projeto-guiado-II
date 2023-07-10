const express = require("express") //importa o express
const app = express() //executa o express
app.use(express.json()) //uso o body parse

const songsRoutes = require("./routes/songsRoutes")//importa as rotas de músicas
app.use("/reprogramafy/playlist", songsRoutes)// definiu rota padrão para músicas

const podcastsRoutes = require("./routes/podcastsRoutes")// importa as rotas de podcasts
app.use("/reprogramafy/podcasts", podcastsRoutes)//definiu a rota padrão para podcasts

module.exports = app

