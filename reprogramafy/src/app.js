const express = require("express"); //importa o express
const app = express(); // executa o express
app.use(express.json()); // udo o body parse


const songsRoutes = require("./routes/podcastsRoutes"); //importa a rota musicas
app.use("/reprogramafy/podcasts", songsRoutes); // define rotas padão musicas

const podcastsRoutes = require("./routes/songsRoutes"); // importa as rotas podCast
app.use("/reprogramafy/playlist", podcastsRoutes);// define ratas padrão podCast

module.exports = app;