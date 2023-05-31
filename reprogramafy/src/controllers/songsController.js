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

module.exports = {
    getAllSongs,
    getSong,
    getArtist,
    addSong
}