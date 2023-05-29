const { request } = require('express')
const songsJson = require('../models/songs.json')
const getAllSongs = (request, response) =>{
    try {
        response.status(200).json([{
            Songs: songsJson
        }])
    } catch (error) {
        response.status(500).send([{
            Message: 'error no server'
        }])
    }
}

const getSong = (request, response) =>{
    const songRequest = request.params.id
    const songFilter = songsJson.filter(song=>song.id == songRequest)

    if(songFilter.length > 0) {
        response.status(200).send(songFilter)
    } else{
        response.status(404).send([{
            message: 'Not found!'
        }])

    }
}

const getArtists = (request, response) =>{
    let artistsRequest = request.query.artists.toLowerCase()
    let artistsFilter = songsJson.filter((song)=>{
        artistsLowerCase = song.artists.map((artistsArray)=> artistsArray.toLowerCase())
        return artistsLowerCase.includes(artistsRequest)
    })

    console.log(artistsFilter);
    if(artistsFilter.length > 0) {
        response.status(200).send(artistsFilter)
    } else{
        response.status(404).send([{
            message: 'Not found!'
        }])
    }
}

const addSong = (request, response) =>{
    try {
        let titleRequest = request.body.title;
        let launchYearRequest = request.body.launchYearRequest
        let favoriteRequest = request.body.favorited
        let artistsRequest = request.body.artists
        
        let newSong ={
            id: Math.floor(Date.now() * Math.random()).toString(36),
            title: titleRequest,
            launchYear: launchYearRequest,
            favorited: favoriteRequest,
            artists: artistsRequest,
        };
        songsJson.push(newSong)
        response.status(201).json([{
            message: 'New sond added'
        }])
    } catch (error) {
        console.log(error)
        response.status(500).send([{
            message: 'Erro interno ao cadastar'
        }])
    }
}

const updateSong = (request, response) =>{
    const idRequest= request.params.id
    let songRequest = request.body
    let findSong = songsJson.findIndex((song) => song.id == idRequest)

    if (songsJson.splice(findSong, 1, songRequest)) {
        response.status(200).json([{
            message: 'Musica atualizada',
            songsJson
        }])
    }else{
        response.status(404).send([{
            message: 'Musica nao encontrada'
        }])
    }
}

const deleteSong = (request, response) =>{
    const idRequest = request.params.id
    const findSong = songsJson.findIndex((song) =>song.id ==idRequest)

    songsJson.splice(findSong, 1)

    if (findSong) {
        response.status(200).json([{
            message: 'Musica selecionada foi deletada',
            'musica deletada': idRequest
        }])
    }else{
        response.status(404).send([{
            message: 'Musica nao deletada'
        }])
    }
 }

 const updateFav = (request, response) =>{
    const idRequest = request.params.id
    const favoriteRequest = request.body.favorited
    favoritedFind = songsJson.find((song) => song.id == idRequest)

    if(favoritedFind){
        favoritedFind.favorited = favoriteRequest,
        response.status(200).json([{
            message: 'Classificacao atualizada',
            favoritedFind
        }])
    } else{
        response.status(404).json([{
            message: 'Not found'
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