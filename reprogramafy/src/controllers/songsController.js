const songsJson = require("../models/songs.json") // conectando o controllers com as rotas e app

//const express = require("express")

const getAllSongs = (req, res)=>{
    try {
        res.status(200).json([{
            songs: songsJson,
        }])
    } catch (error) {
        res.status(500).send([{
            message: 'Erro no Server'
        }])
    }
}

const getSongs = (req, res)=>{
    const songRequest = req.params.id
    const songFilter = songsJson.filter(song => song.id == songRequest)
    if(songFilter.length > 0){
        res.status(200).send(songFilter)
    } else {
        res.status(404).send(([{
            message: "Musica não encontrada!!! / Not Found!!!"
        }]))
    }
}


const getArtit = (req, res) =>{
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

const addSong = (req, res) =>{
    try {
        let titleRequest = req.body.title;
        let launchYearRequest = req.body.launchYear;
        let favoritedRequest = req.body.favorited;
        let artistsRequest = req.body.artists;

        let newSong = {
            id: Math.floor(Date.now() * Math.random()).toString(36),
            title: titleRequest,
            launchYear: launchYearRequest,
            favorited: favoritedRequest,
            artists: artistsRequest
        };
        songsJson.push(newSong)
        res.status(201).json([{
            message: "Nova música cadastrada!!!/ Add New Song!!",
            newSong
        }])
    } catch (error) {
        console.log(error)
        res.status(500).send([{
            message: "Erro interno ao cadastrar!!!"
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
    const songFind = songsJson.findIndex((song) => song.id == idRequest)
    songsJson.splice(songFind, 1)
    if (songFind) {
        res.status(200).json([{
            message: "A musica selecionada foi deletada!!",
            "musica deletada": idRequest, 
            songsJson
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
            message: "Classificação atualizada com Sucesso!!",
        favoritedFind
        }])
    } else {
        res.status(404).json([{
            message: "Não quero hoje!!!"
        }])
    }
}



module.exports = {
    getAllSongs,
    getSongs,
    getArtit,
    addSong,
    updateSong,
    deleteSong,
    updateFav
}

