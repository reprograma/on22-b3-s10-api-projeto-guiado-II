const express = require("express") //importa express
const app = express() //executa express
app.use(express.json()) //use o badyparse

const songsRoutes = require("./routes/songsRoutes") // importa as rotas de músicas
app.use("/reprogramafy/playlist",songsRoutes) // define rota padrão para música

const podcastsRoutes = require("./routes/podcastsRoutes") // importa as rotas
app.use("/reprogramafy/podcasts", podcastsRoutes) // definiu a rota padrão para podcasts

module.exports = app
