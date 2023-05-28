const songsJson = require("../models/songs.json")

const getAllSongs = (req, res)=>{
    try {
        res.status(200).json([{
            songs : songsJson
        }])
    } catch (error) {
        res.status(500).send([{
            messeage : "erro no server"
        }])
    }
}

const getSong = (req,res)=>{
    const songRequest = req.params.id
    const songFilter = songsJson.filter((song) => song.id == songRequest)

    if(songFilter.length > 0) {
        res.status(200).send(songFilter)
    }   else {
            res.status(404).send([{
                message : "Not found / Música não encontrada"
            }])
        }
    }

const getArtists = (req,res) => {
    let artistRequest = req.query.artists.toLowerCase()
    let artistFilter = songsJson.filter((song) => {
        artistsLowerCase = song.artists.map((artistsArray) => artistsArray.toLowerCase())
        return artistsLowerCase.includes(artistRequest)
       
    })

    console.log(artistFilter);

    if(artistFilter.length > 0) {
        res.status(200).send(artistFilter)
    }
    else {
        res.status(404).send([{
            message : "Not found / Artista não encontrado"

        }])
    }
}

const addSong = (req, res) => {
    try {
        let titleRequest = req.body.title;
        let launchYearRequest = req.body.launchYear;
        let favoritedRequest = req.body.favorited;
        let artistRequest = req.body.artists;

        let newSong = {
            id: Math.floor(Date.now() * Math.random()).toString(36),
            title: titleRequest,
            launchYear: launchYearRequest,
            favorited: favoritedRequest,
            artists: artistsRequest,
        };
        songsJson.push(newSong)
        res.status(201).json([{
            message: "Nova música cadastrada"
        }])
    } catch (error) {
        console.log(error)
        res.status(500).send(([{
            message: "Erro interno ao cadastrar"
        }]))
        
    }
}

const updateSong = (req, res) => {
    const idRequest = req.params.id
    let songRequest = req.body
    let findSong = songsJson.findIndex((song) => song.id == idRequest)

    if(songsJson.splice(findSong, 1, songRequest)) {
        res.status(200).json([{
            message: "Música atualizada com sucesso.",
            songsJson
        }])
        }
        else {
            res.status(404).send([{
                message:"Música não encontrada"
            }])
        }

        
    }

    const deleteSong = (req, res) => {
        const idRequest = req.params.id
        const findSong = songsJson.findIndex((song) => song.id == idRequest)

        songsJson.splice(findSong, 1)

        if(findSong) {
            res.status(200).json([{
                message: "A música foi deletada",
                "música deletada": idRequest,
                songsJson
            }])

        } else {
            res.status(404).send([{
                message: "Not found / Música não deletada."
            }])

        }

    }

    const updateFav = (req, res) => {
        const idRequest = req.params.id
        const favoritedRequest = req.body.favorited
        favoritedFind = songsJson.find((song) => song.id == idRequest)

        if (favoritedFind) {
            favoritedFind.favorited = favoritedRequest,
            res.status(200).json([{
                message: "Classificação atualizada com sucesso."
            }])
            
        } else {
            res.status(404).json([{
                message: "Não quero hoje"
            }])
            
        }
    }




module.exports={
    getAllSongs,
    getSong,
    getArtists,
    addSong,
    updateSong,
    deleteSong,
    updateFav
}