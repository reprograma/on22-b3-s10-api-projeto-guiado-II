const songsJson = require('../models/songs.json')

const getAllSongs = (req, res) => {
    try {
        res.status(200).json([{
            songs: songsJson
        }])
    } catch (err) {
        res.status(500).send([{
            message: 'Erro no server'
        }])
    }
}

const getSong = (req, res) => {
    const songRequest = req.params.id
    const songFilter = songsJson.filter((song) => song.id == songRequest)

    if (songFilter.length > 0) {
        res.status(200).send(songFilter)
    } else {
        res.status(404).send([{
            message: 'Not found!'
        }])
    }
}

const getArtist = (req, res) => {
    let artistRequest = req.query.artists.toLowerCase()
    let artistFilter = songsJson.filter((song) => {
        artistLowerCase = song.artists.map((artistArray) => artistArray.toLowerCase())
        return artistLowerCase.includes(artistRequest)
    })

    console.log(artistFilter);

    if (artistFilter.length > 0) {
        res.status(200).send(artistFilter)
    } else {
        res.status(404).send([{
            message: 'Not found!'
        }])
    }
}
    const addSong = (req, res) => {
        try {
            let titleRequest = req.body.title
            let launchYearRequest = req.body.launchYear
            let favoritedRequest = req.body.favorited
            let artistRequest = req.body.artists

            let newSong = {
                id: Math.floor(Date.now() * Math.random()).toString(36),
                title: titleRequest,
                launchYear: launchYearRequest,
                favorited: favoritedRequest,
                artists: artistRequest
            };
            songsJson.push(newSong)
            res.status(201).json([{
                message: 'nova musica cadastrada!'
            }])
        } catch (error) {
            console.log(error)
            res.status(500).send([{
                message: 'Internal error'
            }])
        }
    }

    const updateSong = (req, res) => {
        const idRequest = req.params.id
        let songRequest = req.body
        let findSong = songsJson.findIndex((song) => song.id == idRequest)

        if (songsJson.splice(findSong, 1, songRequest)) {
            res.status(200).json([{
                message: 'Música atualizada com sucesso!',
                songsJson
            }])
        } else {
            res.status(404).send([{
                message: 'Música não encontrada!'
            }])
        }
    }

    const deleteSong = (req, res) => {
        const idRequest = req.params.id
        const findSong = songsJson.findIndex((song) => song.id == idRequest)

        songsJson.splice(findSong, 1)

        if (findSong) {
            res.status(200).json([{
                message: 'A música selecionada foi deletada!',
                'música deletada': idRequest,
                songsJson
            }])
        } else {
            res.status(404).send([{
                message: 'Música não deletada!'
            }])
        }
    }

    const updateFav = (req, res) => {
        const idRequest = req.params.id
        const favoritedRequest = req.body.favorited
        findFavorited = songsJson.find((song) => song.id == idRequest)
        
        if (findFavorited) {
            findFavorited.favorited = favoritedRequest
            res.status(200).json([{
                message: 'Classificação atualizada com sucesso!'
            }])
        } else {
            res.status(404).send([{
                message: 'Classificação não alterada!'
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