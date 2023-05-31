const express = require("express"); // importa o express
const songsRoutes = require("./routes/songsRoutes"); // Importa as rotas de musica
const podcastRoutes = require("./routes/podcastsRoutes"); // Importa as rotas de podcast

const app = express(); //executa o express

app.use(express.json()); // uso do body parse

app.use("/reprogramafy/playlist", songsRoutes); // Definindo rota padrão para musica
app.use("/reprogramafy/pods", podcastRoutes); // Rota padrão para o podcast

module.exports = app;
