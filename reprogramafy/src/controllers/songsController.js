const { request } = require("http")
const songsJson = require("../models/songs.json")

const getAllSongs = (request, response) => {
    try {
        response.status(200).json([{
            songs: songsJson
        }])
    } catch (error) {
        response.status(500).send([{
            message: "erro no server"
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

const getArtists = (request, response) => {
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

const addSong = (req, res) => {
    try {
        let titleRequest = req.body.title;
        let     launchYearRequest = req.body.launchYear
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
            message: "Nova musica cadastrada"
        }])
    } catch (err) {
        console.log(err)
        res.status(500).send([{
            message: "Erro interno ao cadastrar."
        }])
    }
}

const updateSong = (req, res) => {
    const idRequest = req.params.id
    let songRequest = req.body
    let findSong = songsJson.findIndex((song) => song.id == idRequest)

    if (songsJson.splice(findSong, 1, songRequest)) {
        res.status(200).json([{
            message: "Musica bem atualizada",
            songsJson
        }])
    } else {
        res.status(404).send([{
            message: "Deu errado"
        }])
    }
}

const deleteSong = (req, res) => {
    const idRequest = req.params.id
    const findSong = songsJson.findIndex((song) => song.id == idRequest)

    songsJson.splice(findSong, 1)
    
    if (findSong) {
        res.status(200).json([{
            message: "A musica foi deletada",
            "Musica deletada": idRequest,
            songsJson
        }])
    } else {
        res.status(404).send([{
            message: "Musica não deletada"
        }])
    }
}

const updateFav = (req, res) => {
    const idRequest = req.params.id
    const favoritedRequest = req.body.favorited
    favoritedFind = songsJson.find((song) => song.id == idRequest)

    if (favoritedFind) {
        favoritedFind.favorited = favoritedRequest
        res.status(200).json([{
            message: "Musica atualizada"
        }])
    } else {
        res.status(404).json([{
            message: "Not found"
        }])
    }
}


module.exports = {
    getAllSongs,
    getSong,
    getArtists,
    addSong,
    updateSong,
    deleteSong,
    updateFav
}