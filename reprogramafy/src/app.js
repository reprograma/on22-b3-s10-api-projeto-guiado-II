const express = require("express"); //importo o express

const app = express(); // executo o express

app.use(express.json()); // uso o body parse

// importe da continuação de rotas podcast
const podRoutes = require("./routes/podcastsRoutes");

app.use("/reprogramafy/podcasts", podRoutes); // crio uma rota raiz

const songsRoutes = require("./routes/songsRoutes");

app.use("/reprogramafy/playlist", songsRoutes);
// exportando para usar o server.js
module.exports = app;