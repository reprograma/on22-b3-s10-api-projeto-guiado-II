const express = require("express") //Importa biblioteca(recursos) do express
const app = express() //Executando o express
app.use(express.json())//Pc use o express na linguagem json (body parse)

const songsRoutes = require("./routes/songsRoutes")//Importa a rota de songs
app.use("/reprogramafy/playlist", songsRoutes)//Definiu rota padrão(nome pra direcionar o site) pra song

const podcastRoutes = require("./routes/podcastsRoutes")
app.use("/reprogramafy/podcast", podcastRoutes)

module.exports = app//Exportando pra exportar o server