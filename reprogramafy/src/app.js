const express = require("express"); //importa o express
const app = express(); //executa o express
app.use(express.json()); //uso do bodyparse

const songsRoutes = require("./routes/songsRoutes"); //importa as rotas de musicas

app.use("/reprogramafy/playlist", songsRoutes); //definiu rota padrão para músicas

const podcastsRoutes = require("./routes/podcastsRoutes"); //importa rotas de podcasts

app.use("/reprogramafy/podcasts", podcastsRoutes); //definiu rota padrão para podcasts

module.exports = app;

