const songsJson = require("../models/songs.json");

const getAllSongs = (req, res) => {
    try {
        res.status(200).json([{
            songs: songsJson
        }])
    } catch (error) {
        res.status(500).send([{
            message: "erro no server"
        }])
    }
}

const getSongs = (req, res) => {
    const songRequest = req.params.id
    const songFilter = songsJson.filter(song => song.id == songRequest)

    if (songFilter.length > 0) {
        res.status(200).send(songFilter)
    } else {
        res.status(404).send([{
            message: "not found"
        }])
    }
}

const getArtists = (req, res) => {
    let artistsRequest = req.query.artists.toLowerCase()
    let artistFilter = songsJson.filter((song) => {
        artistsLowerCase = song.artists.map((artistsArray) => artistsArray.toLowerCase())
        return artistsLowerCase.includes(artistsRequest)
    })
    console.log(artistFilter)

    if (artistFilter.length > 0) {
        res.status(200).send(artistFilter)
    } else {
        res.status(404).send([{
            message: "not found"
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

const updateSongs = (req, res) => {
    const idRequest = req.params.id;
    let songRequest = req.body;
    let findSong = songsJson.findIndex((song) => song.id == idRequest)

    if (songsJson.splice(findSong, 1, songRequest)) {
        res.status(200).json([{
            message: "musica atualizada com sucesso",
            songsJson
        }])
    } else {
        res.status(404).send([{
            message: "song not found"
        }])
    }
}

const deleteSongs = (req, res) => {
    const idRequest = req.params.id;
    const findSong = songsJson.findIndex((song) => song.id == idRequest)

    songsJson.splice(findSong, 1)

    if (findSong) {
        res.status(200).json([{
            message: "a musica selecionada foi deletada",
            "musica deletada": idRequest,
            songsJson,
        }])
    } else {
        res.status(404).send([{
            message: "musica não deletada"
        }])
    }
}

const updateFav = (req, res) => {
    const idRequest = req.params.id;
    const favoritedRequest = req.body.favorited;
    favoritedFind = songsJson.find((song) => song.id == idRequest)

    if (favoritedFind) {
        favoritedFind.favorited = favoritedRequest
        res.status(200).json([{
            message: "classificação atualizada com sucesso"
        }])
    } else {
        res.status(404).json([{
            message: "não alterou, infeeeeerno"
        }])
    }
}


module.exports = {
    getAllSongs,
    getSongs,
    getArtists,
    addSong,
    updateSongs,
    deleteSongs,
    updateFav,
}
