const express = require("express")
const app = express() 
app.use(express.json())

const songsRoutes = require("./routes/songsRoutes")
app.use("/reprogramafy/playlist", songsRoutes)

const podcastsRoutes = require("./routes/podcastsRoutes")
app.use("/reprogamafy/podcasts", podcastsRoutes)

module.exports = app