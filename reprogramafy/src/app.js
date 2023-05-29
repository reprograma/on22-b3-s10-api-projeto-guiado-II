const express = require("express")
const app = express()
app.use(express.json())

const songsRoutes = require("./routes/songsRoutes")
app.use("/reprogramafy/playlist", songsRoutes)//DEFINIU ROTA PADRÃO P/ MUSICAS

const podcastsRoutes = require("./routes/podcastsRoutes")
app.use("/reprogramafy/podcasts",podcastsRoutes)

module.exports = app