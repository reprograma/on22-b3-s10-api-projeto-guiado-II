const express = require("express"); // importa o express
const app = express(); //executa o express
app.use(express.json()); // uso do body parse

const songsRoutes = require("./routes/songsRoutes"); //importa as rotas de songs
app.use("/reprogramafy/playlist", songsRoutes); //definiu rota padrão para musicas
const podcastRoutes = require("./routes/podcastsRoutes");
app.use("/reprogramafy/podcasts", podcastRoutes);

module.exports = app;