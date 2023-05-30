const songsJson = require("../models/songs.json")

const getAllSongs = (req, res) =>{
    try {
        res.status(200).json([{
            songs: songsJson,
        }])
    } catch (error) {
        res.status(500).send([{
            message:"erro no server"
        }])
    }
}

const getSongs = (req, res) => {
        const songRequest = req.params.id
        const songFilter = songsJson.filter((song)=> song.id == songRequest)

        if(songFilter.length > 0) {
            res.status(200).send(songFilter)
        } else {
            res.status(404).send([{
                message: "Musica não encontrada"
            }])
        }
}

const getArtists = (req, res) => {
    let artistsRequest = req.query.artists.toLowerCase()
    let artistsFilter = songsJson.filter((song)=> {
    artistsLowerCase = song.artists.map((artistsArray)=> artistsArray.toLowerCase())
    return artistsLowerCase.includes(artistsRequest)
    })

    console.log(artistsFilter);
    if (artistsFilter.length > 0) {
        res.status(200).send(artistsFilter)
    }else {
            res.status(400).send([{
                message: "Artista não encontrado"
            }])
        }
    }

    const addSong = (req, res) => {
        try {
            let titleRequest = req.body.title;
            let launchYearRequest = req.body.launchYear
            let favoritedRequest = req.body.favoritedRequest
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
                message: "Nova musica cadastrada",
                newSong
            }])
        } catch (error) {
            console.log(error)
            res.status(500).send([{
                message: "erro interno ao cadastrar"
            }])
        }
    }

    const updateSong = (req, res)=> {
        const idRequest = req.params.id
        const favoritedRequest = req.body.favorited
        favoritedFind = songsJson.find((song)=> song.id == idRequest)

        if(favoritedFind){
            favoritedFind.favorited = favoritedRequest
        res.status(200).json([{
            message: "Classificação atualizada com sucesso",
            songsJson
        }]) 
        } else {
            res.status(400).send([{
                message: "Mùsica não encontrada"
            }])
        }
    }

        const deleteSong = (req, res)=> {
            const idRequest = req.params.id
            const findSong = songsJson.findIndex((song) => song.id == idRequest)

            songsJson.splice(findSong, 1)

            if(findSong) {
                res.status(200).json([{
                    message: "A musica foi deletada",
                    "musica deletada": idRequest,
                    songsJson
                }])
            } else {
                res.status(404).send([{
                    message: "Not found",
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
    getSongs,
    getArtists,
    addSong,
    updateSong,
    deleteSong,
    updateFav
}