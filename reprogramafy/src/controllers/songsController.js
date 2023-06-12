const songsJson = require('../models/songs.json') //importando arquivo json

const getAllSongs = (request, response) => {
    try {
        response.status(200).json(Song.objects.all())
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
const Song = {
    objects: {
        _songs: songsJson,
        create: (songData) => {
            const lastSong = Song.objects._songs[Song.objects._songs.length -1]
            const id = lastSong.id + 1
            songData.id = id

            Song.objects._songs.push(songData)
            return songData
        },
        
    all: () => {
        return Song.objects._songs
    } 

    }

}

const addSong = (request, response) => {
    try {
        const newSong = Song.objects.create(request.body)
        response.status(201).json(newSong)
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