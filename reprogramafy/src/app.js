const express = require("express") //importa o espress
const app = express() //executa express

app.use(express.json()) //uso o body parse

const songsRoutes = require("./routes/songsRoutes") //importa as rotas de songs
app.use("/reprogramafy/playlist", songsRoutes) //definiu rota padrao para musicas

const podcastsRoutes = require("./routes/podcastsRoutes") // importa as rotas de podcast
app.use("/reprogramafy/podcasts", podcastsRoutes) //definiu rota padrao de podcast

module.exports = app