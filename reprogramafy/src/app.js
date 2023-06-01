const express = require("express") //importa o express
const app = express() //executa o express
app.use(express.json()) //uso o body parse

const songsRoutes = require("./routes/songsRoutes") //importa as rotas de musica 
app.use("/reprogramafy/playlist", songsRoutes) // definiu rota padrao para musica 

const podcastsRoutes = require("./routes/podcastsRoutes") //importa as rotas 
app.use("/reprogramafy/podcasts", podcastsRoutes) //definiu a rota padrao 

module.exports = app