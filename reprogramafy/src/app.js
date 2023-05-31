const express = require("express") //importa o express
const app = express() // executa o express
app.use(express.json()) // uso o bodyparse

const songsRoutes = require("./routes/songsRoutes") // importa as rotas de músicas
app.use("/reprogramafy/playlist", songsRoutes) // definindo rota padrão para músicas

const podcastsRoutes = require("./routes/podcastsRoutes")
app.use("/reprogramafy/podcasts", podcastsRoutes)

module.exports = app
