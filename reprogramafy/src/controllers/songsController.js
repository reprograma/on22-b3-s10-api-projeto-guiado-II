const { response } = require('express')
const songsJson = require('../models/songs.json') //importando arquivo json

const getAllSongs = (request, response) => {
    try {
        response.status(200).json([{
            songs: songsJson
        }])
    } catch (error) {
        response.status(500).send([{ //status 500 é de erro do servidor
            message: 'Erro no servidor'
        }])       
    }
}

const getSong = (request, response) => {
    const id = request.params.id
    const filter = songsJson.filter((song) => song.id == id)
    if (filter.length > 0) {
        response.status(200).send(filter)
    } else {
        response.status(404).send([{
            message: 'Not found'
        }])
    }
}

const getArtist = (request, response) => {
    let artist = request.query.artists.toLowerCase()
    let filter = songsJson.filter((song) => {
        artistsLowerCase = song.artists.map((artistsArray) => artistsArray.toLowerCase())
        return artistsLowerCase.includes(artist)
    })
    console.log(filter);
    if (filter.length >0) {
        response.status(200).send(filter)
    } else {
        response.status(404).send([{
            message: 'Not found'
        }])
    }
}

const addSong = (request, response) => {
    try {
        let title = request.body.title
        let launchYear = request.body.launchYear
        let favorited = request.body.favorited
        let artist = request.body.artist
        
        let newSong = {
            id: Math.floor(Date.now() * Math.random()).toString(36),
            title: title,
            launchYear: launchYear,
            favorited: favorited,
            artist: artist
        };
        songsJson.push(newSong)
        response.status(201).json([{
            message: 'Nova música cadastrada'
        }])

    } catch (error) {
        console.log(error)
        response.status(500).send([{
            message: 'Erro interno ao cadastrar'
        }])
    }
}

const updateSong = (request, response) => {
    const id = request.params.id
    let song = request.body
    let findSong = songsJson.findIndex((song) => song.id == id)
    
    if (songsJson.slice(findSong, 1, song) > 0) {
        response.status(200).json([{
            message: 'Musica atualizada com sucesso!',
            songsJson
        }])
    } else {
        response.status(404).send([{
            message: 'Musica não encontrada'
        }])        
    }
}

const deleteSong = (request, response) => {
    const id = request.params.id
    let findSong = songsJson.findIndex((song) => song.id ==id)

    songsJson.splice(findSong, 1)
    if (findSong) {
        response.status(200).json([{
            message: 'A musica adicionada foi deletada',
            'musica deletada': id,
            songsJson
        }])
        
    } else {
        response.status(404).send([{
            message: 'Musica não deletada'
        }])
    }
}

const updateFav = (request, response) => {
    const id = request.params.id
    const favorited = request.body.favorited
    const favoritedFind = songsJson.find((song) => song.id == id)

    if (favoritedFind) {
        favoritedFind.favorited = favorited
        response.status(200).json([{
            message: 'classificação atualizada com sucesso'
        }])
        
    } else {
        response.status(404).json([{
            message: 'Não quero hoje'
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