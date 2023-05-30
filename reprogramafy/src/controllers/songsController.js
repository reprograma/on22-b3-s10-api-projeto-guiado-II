const songsJson = require("../models/songs.json") 

const getAllSongs = (request, response) => {
    try { //tente pegar essa informação
        response.status(200).json([{
            songs : songsJson
        }])
    } catch (err) { //se não pegar, manda a msg de erro
        response.status(500).send([{ //500 é status de erro de servidor
            message : "erro no server"
        }]) 
    }
}

const getSong = (request, response) => {
    const songRequest = request.params.id
    const songFilter = songsJson.filter((song) => song.id == songRequest)
    
    if (songFilter.length > 0) {
        response.status(200).send(songFilter)
    } else {
        response.status(404).send([{
            message : "Song not foud!"
        }])
    }
}

const getArtist = (request, response) => {
    let artistsRequest = request.query.artists.toLowerCase()
    let artistsFilter = songsJson.filter((song) => {
        artistsLowerCase = song.artists.map((artistsArray) => artistsArray.toLowerCase())
        return artistsLowerCase.includes(artistsRequest)
    })

    console.log(artistsFilter);
    if(artistsFilter.length > 0) {
        response.status(200).send(artistsFilter)
    } else {
        response.status(404).send([{
            message : "Artist not found!"
        }])
    }
}

const addSong = (request, response) => {
    try {
        let titleRequest = request.body.title;
        let launchYearRequest = request.body.launchYear;
        let favoritedRequest = request.body.favorited;
        let artistRequest = request.body.artist;
        
        let newSong = {
            id: Math.floor(Date.now() * Math.random()).toString(36),
            title: titleRequest,
            launchYear: launchYearRequest,
            favorited: favoritedRequest,
            artist: artistRequest,
        };
songsJson.push(newSong)
response.status(201).json([{
    message: "nova música cadastrada"
}])

    } catch (error) {
        console.log(error)
        response.status(500).send([{
            message: "erro interno ao cadastrar"
        }])
    }
}

const updateSong = (request, response) => {
    const idRequest = request.params.id
    let songRequest = request.body
    let findSong = songsJson.findIndex((song) => song.id == idRequest)

    if (songsJson.splice(findSong, 1, songRequest)) {
        response.status(200).json([{
            message: "Música atualizada com sucesso.",
            songsJson
        }])
    } else {
        response.status(404).send([{
            message: "Música não encontrada."
        }])
       
        
    }
}

const deleteSong = (request, response) => {
    const idRequest = request.params.id
    const findSong = songsJson.findIndex((song) => song.id == idRequest)

    songsJson.splice(findSong, 1)

    if (findSong) {
        response.status(200).json([{
            message: "A música selecionada foi deletada.",
            "música deletada": idRequest,
            songsJson
        }])
        
    } else {
        response.status(404).send([{
        message: "Música não deletada!"
}])        
    }
}

const updateFav = (request, response) => {
    const idRequest = request.params.id
    const favoritedRequest = request.body.favorited
    favoritedFind = songsJson.find((song) => song.id == idRequest)

    if (favoritedFind) {
         favoritedFind.favorited = favoritedRequest,
         response.status(200).json([{
            message: "Classificação atualizada com sucesso!!",
         }])
    } else {
        response.status(404).json([{
            message: "Não foi possível realizar a alteração/Not Found!"
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

