const express = require("express") // importa o express
const app = express() //executa o express
app.use(express.json()) //uso o body parse

const songsRoutes = require("./routes/songsRoutes") // importa as rotas de songs
app.use("/reprogramafy/playlist", songsRoutes) // definiu a rota padrão para songs

const podcastsRoutes = require("./routes/podcastsRoutes") //importa as rotas
app.use("/reprogramafy/podcasts", podcastsRoutes) //definiu a rota padrão para podcasts

module.exports = app