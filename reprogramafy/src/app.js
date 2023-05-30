const express = require("express") //Importa o express
const app = express() //Executa o express
app.use(express.json()) //Uso o body parse

const songsRoutes = require("./routes/songsRoutes") //Importa as rotas de songs
app.use("/reprogramafy/playlist", songsRoutes) //Definiu rota padrão para músicas 

const podcastsRoutes = require("./routes/podcastsRoutes") //Importa as rotas de podcasts
app.use("/reprogramafy/podcasts", podcastsRoutes) //Definiu rota padrão para podcats


module.exports = app

