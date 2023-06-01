const getAllSongs = (request, response) =>{
    try {
        response.status(200).json([{
            songs : songsJson
        }])
    } catch (error) {
        response.status(500).send([{
            menssage: 'erro no server'
        }])
    }
}

const getSong = (request, response) => {
    const songRequest = request.params.id
    const songFilter = songsJson.filter((song) => song.id == songRequest)

    if (songFilter.lenght > 0 ) {
  res.status(200).send(songFilter)
} else {
  res.status(404).send([{  
    message: "Not Found! "
    }])
  }

}

const getArtist = (req, res) => {
    let artistsRequest = req.query.artists.toLowerCase()
    let artistsFilter = songsJson.filter((song) =>{
        artistsLowerCase = song.artists.map((artistsArray)=> artistsArray.toLowerCase())
        return artistsLowerCase.includes(artistsRequest)
    })

    console.log(artistsFilter);
    if (artistsFilter.length > 0) {
        res.status(200).send(artistsFilter)
    } else {
        res.status(404).send([{
            message: "Artista não encontrado!!! / Not Found!!!"
        }])
    }
}

const addSong = (req, res) => {
    try {
        let titleRequest = req.body.title;
        let launchYearRequest = req.body.launchYear
        let favoritedRequest = req.body.favorited
        let artistsRequest = req.body.artists

        let newSong = {
            id: Math.floor(Date.now() * Math.random()).toString(36),
            title: titleRequest,
            launchYear: launchYearRequest,
            favorited: favoritedRequest,
            artists: artistsRequest,
        };
        songsJson.push(newSong)
        res.status(201).json([{
            message: "nova musica cadastrada"
        }])

    } catch (error) {
        console.log(error)
        res.status(500).send([{
            message: "erro interno ao cadastrar"
        }])
    }
}
const updateSong = (req, res) =>{
    const idRequest = req.params.id 
    let songRequest = req.body
    let findSong = songsJson.findIndex((song) => song.id == idRequest)

    if (songsJson.splice(findSong, 1, songRequest)) {
        res.status(200).json([{
            message: "Musica atualizada com sucesso!!/ Update songs sucess!!",
            songsJson
        }])
    } else {
        res.status(404).send([{
            message: "Musica não encontrado!!"
        }])
    }
}

const deleteSong = (req, res) =>{
    const idRequest = req.params.id 
    const songFilter = songsJson.findIndex((song) => song.id == idRequest)
    songsJson.splice(songFilter, 1)
    if (songFilter) {
        res.status(200).json([{
            message: "A musica selecionada foi deletada!!",
            "musica deletada": idRequest, songsJson
        }])
    } else {
        res.status(404).send([{
            message: "Musica não deletada!!!"
        }])
    }
} 

const updateFav = (req, res) =>{
    const idRequest = req.params.id 
    const favoritedRequest = req.body.favorited 
    favoritedFind = songsJson.find((song) => song.id == idRequest) 

    if (favoritedFind) {
        favoritedFind.favorited = favoritedRequest,
        res.status(200).json([{
            message: "Classificação atualizada com Sucesso!!"
        }])
    } else {
        res.status(404).json([{
            message: "Não quero hoje!!!"
        }])
    }
}



module.exports = {
    getAllSongs,
    getSong,
    getArtist,
    addSong,
    updateSong,
    deleteSong,
    updateFav
}
