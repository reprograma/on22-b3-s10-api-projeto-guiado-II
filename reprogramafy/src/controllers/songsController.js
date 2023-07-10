const reprogramafySongs = require("../models/songs.json")

const getAllSongs = (request, response) => {
    try {
        response.status(200).json([{
            songs: songsJson
        }])
    } catch (err) {
        response.status(500).send([{
            message: "Erro no server"
        }])
    }
}


const getSong = (request, response) => {
    const songRequest = request.params.id
    const songFilter = reprogramafySongs.filter(song => song.id == songRequest)
    if (songFilter.length > 0) {
        response.status(200).send(songFilter)
    } else {
        response.status(404).send([{ message: "Song not found!" }])
    }
}

const getArtists = (request, response) => {
    let artistsRequest = request.query.artists.toLowerCase()
    let artistsFilter = reprogramafySongs.filter((song) => {
        artistsLowerCase = song.artists.map((artistsArray) => artistsArray.toLowerCase())
        return artistsLowerCase.includes(artistsRequest)
    })
    console.log(artistsFilter);
    if (artistsFilter.length > 0) {
        response.status(200).send(artistsFilter)
    } else {
        response.status(404).send([{
            message: "Artist Not Found!!!"
        }])
    }
}


const addSong = (req, res) => {
    try {
        let titleRequest = req.body.title
        let launchYearRequest = req.body.launchYear
        let favoritedRequest = req.body.favorited
        let artistsRequest = req.body.artists
        let newSong = {
            id: Math.floor(Date.now() * Math.random()).toString(36),
            title: titleRequest,
            lounchYear: launchYearRequest,
            favorited: favoritedRequest,
            artists: artistsRequest
        };
        reprogramafySongs.push(newSong)
        res.status(201).json([{
            message: "nova música cadastrada"
        }])
    } catch (error) {
        console.log(error)
        res.status(500).send([{
            message: "erro interno ao cadastrar"
        }])

    }
}


const updateSong = (req, res) => {
    const idRequest = req.params.id
    const songRequest = req.body
    let findSong = reprogramafySongs.findIndex((song) => song.id == idRequest)

    if (reprogramafySongs.splice(findSong, 1, songRequest)) {
        res.status(200).json([{
            message: "musica atualizada com sucesso",
            reprogramafySongs
        }])
    } else {
        res.status(404).json([{
            message: "musica não encontrada"
        }])
    }
}


const deleteSong = (req, res) => {
    const idRequest = req.params.id
    const findSong = reprogramafySongs.findIndex((song) => song.id == idRequest)
    reprogramafySongs.splice(findSong, 1)
    if (findSong) {
        res.status(200).json([{
            message: "A musica selecionada foi deletada.",
            "música deletada": idRequest, reprogramafySongs
        }])
    } else {
        res.status(404).send([{
            message: "Musica não deletada."
        }])
    }
}

const updateFav = (req, res) => {
    const idRequest = req.params.id
    const favoritedRequest = req.body.favorited
    favoritedFind = reprogramafySongs.find((song) => song.id == idRequest)

    if (favoritedFind) {
        favoritedFind.favorited = favoritedRequest,
            res.status(200).json([{
                message: "Classificação atualizada com Sucesso."
            }])
    } else {
        res.status(404).json([{
            message: "Classificação não atualizada."
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