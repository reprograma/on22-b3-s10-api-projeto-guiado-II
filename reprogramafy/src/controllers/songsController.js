const songsJson = require("../models/songs.json")

const getAllSongs = (req,res)=>{
    try {
        res.status(200).json([{
            Songs : songsJson
        }])
    } catch (error) {
        res.status(500).send([{
            message : "Erro no server"
        }])
    }
}

const getSong = (req,res)=>{
    const songReq = req.params.id
    const songFilter = songsJson.filter((song) => song.id == songReq)
    
    if (songFilter.length > 0) {
        res.status(200).send(songFilter)
    } else {
        res.status(404).send([{
            message: "Not found"
        }])
    }

}
const getArtist = (req,res)=>{
    let artistReq = req.query.artists.toLowerCase()
    let artistsFilter = songsJson.filter((song)=> {
        artistsLowerCase = song.artists.map((artistsArray)=>artistsArray.toLowerCase())
        return artistsLowerCase.includes(artistReq)
    })
    console.log(artistsFilter);
    if (artistsFilter.length > 0) {
        res.status(200).send(artistsFilter)
    } else {
       res.status(404).send([{
        message: "Not found"
       }]) 
    }
}

const addSong = (req,res)=>{
    try {
        let titleReq = req.body.title
        let launchYearReq = req.body.launchYear
        let favoritedReq = req.body.favorited
        let artistReq = req.body.artists

        let newSong ={
            id: Math.floor(Date.now() * Math.random()).toString(36),
            title: titleReq,
            launchYear: launchYearReq,
            favorited: favoritedReq,
            artists:artistReq
        };
        songsJson.push(newSong)
        res.status(201).json([{
            message: "nova musica cadastrada"            

        }])

    } catch (error) {
        console.log(error)
        res.status(500).send([{
            message:"erro interno ao cadastrar"
        }])
    }
}
const updateSong = (req,res)=>{
    const idRequest = req.params.id
    let songRequest = req.body
    let findSong = songsJson.findIndex((song)=>song.id == idRequest)

    if (songsJson.slice(findSong,1,songRequest)) {
        res.status(200).json([{
            message: "Musica atualizada com sucesso"
        }])
    } else {
        res.status(404).send([{message:"Musica não encontrada"}])
    }
}
const deleteSong = (req,res) => {
    const idRequest = req.params.id
    const findSong = songsJson.findIndex((song)=> song.id == idRequest)
    songsJson.splice(findSong,1)
    if (findSong) {
        res.status(200).json([{
            message : "Musica deletada",
            "musica deletada":idRequest,
            songsJson}])
    } else {
       res.status(400).json([{
        message: "musica nao deletada"
       }]) 
    }
}
const updateFav = (req,res)=>{
    const idRequest = req.params.id
    const favoritedReq = req.body.favorited
    favoritedFind = songsJson.find((song)=>song.id == idRequest)
    if (favoritedFind) {
        favoritedFind.favorited = favoritedReq
        res.status(200).json([{
            message: "classificação atualizada com sucesso"
        }])
    } else {
        res.status(404).json([{
            message:"Não funcionou gata"
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