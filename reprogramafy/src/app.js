const express = require("express"); //importo o express
const app = express(); //executa o express

app.use(express.json()) //uso o bodyparse

//rotas padrões
const songsRoutes = require("./routes/songsRoutes") //importa as rotas de musicas/songs
app.use("/reprogramafy/playlist", songsRoutes) //definiu rota padrão para musicas

const podcastsRoutes = require("./routes/podcastsRoutes") //importa as rotas dos podcasts
app.use("/reprogramafy/podcasts", podcastsRoutes) //importa a rota dos podcasts

module.exports = app;





