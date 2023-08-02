const express = require("express") 
const app = express() 
app.use(express.json())

const songsRoutesProjetoFinalizadoAluna = require("./routes/songsRoutesProjetoFinalizadoAluna") 
app.use("/reprogramafy/playlist", songsRoutesProjetoFinalizadoAluna) 

const podcastsRoutesProjetoFinalizadoAluna = require("./routes/podcastsRoutesProjetoFinalizadoAluna")
app.use("/reprogramafy/podcasts", podcastsRoutesProjetoFinalizadoAluna) 


module.exports = app 