const reprogramafySongs = require("../models/songs.json")

const getAllSongs = (request, response) => {
    try {
        response.status(200).json([{
            songs: reprogramafySongs
        }])
    } catch (error) {
        response.status(500).send([{
            message: "Erro no server."
        }])
    }
}

const getSongsByID = (request, response) => {
    const songsRequest = request.params.id
    const songFilter = reprogramafySongs.filter(song => song.id == songsRequest)

    if(songFilter.length > 0) {
        response.status(200).send(songFilter)
    } else {
        response.status(404).send([{
            message: "Não foi encontrado."
        }])
    }
}

const getArtists = (request, response) => {
    let artistsRequest = request.query.artists.toLowerCase()
    let artistsFilter = reprogramafySongs.filter((song) => {
        artistsLowerCase = song.artists.map((artistsArray) => artistsArray.toLowerCase())
        return artistsLowerCase.includes(artistsRequest)
    })
    console.log(artistsFilter)
    if (artistsFilter.length > 0) {
        response.status(200).send(artistsFilter)
    } else {
        response.status(404).send([{
            message: "Artista não encontrado."
        }])
    }
}

const addSong = (request, response) => {
    try {
        let titleRequest = request.body.title
        let launchYearRequest = request.body.launchYear
        let favoritedRequest = request.body.favorited
        let artistsRequest = request.body.artists

        let newSong = {
            id: Math.floor(Date.now() * Math.random()).toString(36),
            title: titleRequest,
            launchYear: launchYearRequest,
            favorited: favoritedRequest,
            artists: artistsRequest,
        } 
        reprogramafySongs.push(newSong)
        response.status(201).json([{
            message: "Nova música cadastrada",
            newSong
        }])

    } catch (error) {
        console.log(error)
        response.status(500).send([{
            message: "Erro interno ao cadastrar."
        }])
    }
}

const updateSong = (request, response) => {
    const idRequest = request.params.id
    let songRequest = request.body
    let findSong = reprogramafySongs.findIndex((song) => song.id == idRequest)

    if (reprogramafySongs.splice(findSong, 1, songRequest)) {
        response.status(200).json([{
            message: "Música atualizada com sucesso.",
            reprogramafySongs
        }])
    } else {
        response.status(404).send([{
            messagem: "Música não encontrada."
        }])
    }
}

const deleteSong = (request, response) => {
    const idRequest = request.params.id 
    const findSong = reprogramafySongs.findIndex((song) => song.id == idRequest)
    reprogramafySongs.splice(findSong, 1)
    if (findSong) {
        response.status(200).json([{
            message: "A musica selecionada foi deletada.",
            "música deletada": idRequest, reprogramafySongs
        }])
    } else {
        response.status(404).send([{
            message: "Musica não deletada."
        }])
    }
}

const updateFav = (request, response) =>{
    const idRequest = request.params.id 
    const favoritedRequest = request.body.favorited 
    favoritedFind = reprogramafySongs.find((song) => song.id == idRequest) 

    if (favoritedFind) {
        favoritedFind.favorited = favoritedRequest,
        response.status(200).json([{
            message: "Classificação atualizada com Sucesso."
        }])
    } else {
        response.status(404).json([{
            message: "Classificação não atualizada."
        }])
    }
}

module.exports = {
    getAllSongs,
    getSongsByID,
    getArtists,
    addSong,
    updateSong,
    deleteSong,
    updateFav,
   
}