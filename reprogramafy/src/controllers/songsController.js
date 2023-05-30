const songsJson = require('../models/songs.json')


const getAllSongs = (req,res)=>{
    try {
        res.status(200).json([{
            'songs': songsJson
        }])
    } catch (error) {
        res.status(500).send([{
            message: 'Server error'
        }])
    }
}

const getSongById = (req,res)=>{
        const idRequest = req.params.id
        let songFilter = songsJson.filter((song)=> song.id == idRequest)

        if(songFilter.length>0){
            res.status(200).send([{songFilter}])
        } else {
            res.status(404).send([{
                message: 'Not found'
            }])
        }
}

const getByArtist = (req,res)=>{
    let artistsRequest = req.query.artists.toLocaleLowerCase()
    let artistsFilter = songsJson.filter((song)=> {
        artistsLowerCase = song.artists.map((artistsArray)=> artistsArray.toLocaleLowerCase())   //map foi porque artists é um array dentro do objeto song
        return artistsLowerCase.includes(artistsRequest)  //achar mesmo se for 01 nome só
    })
    
    console.log(artistsFilter)

    if(artistsFilter.lenght>0){
        res.status(200).send(artistsFilter)
    } else {
        res.status(404).send([{
            message: 'Not found'
        }])
    }
}

const addSong = (req,res)=>{
    try {
        let titleRequest = req.body.title 
        let launchYearRequest = req.body.launchYear 
        let favoritedRquest = req.body.favorited
        let artistsRequest = req.body.artists

        let newSong = {
            id: Math.floor(Date.now() * Math.random()).toString(36),
            title: titleRequest,
            launchYear: launchYearRequest,
            favorited: favoritedRquest,
            artists: artistsRequest
        
        }

        songsJson.push(newSong)
        res.status(201).json([{
            message: 'New song registered',
            newSong
        }])
    } catch (error) {
        console.log(error)
        res.status(500).send([{
            message: 'Registration error'
        }])
    }
}

const updateSongById = (req,res)=>{
    const idRequest = req.params.id
    let songRequest = req.body

    let findSong = songsJson.findIndex((song)=> song.id == idRequest)

    if(songsJson.splice(findSong,1,songRequest)){
        res.status(200).json([{
            message: 'Song updated successfully',
            songsJson //ver no json inteiro se ele atualizou
        }])
    } else{
        res.status(404).send([{
            message: 'Not found'
        }])    
    }
}


const deleteById = (req,res)=>{
    const idRequest = req.params.id
    const findSong = songsJson.findIndex((song)=> song.id == idRequest)

    songsJson.splice(findSong, 1)

    if(findSong){
        res.status(200).json([{
            message: 'Song deleted',
            'Song deleted': idRequest,
            songsJson
        }])
    } else{
        res.status(404).send([{
            message: 'Song not deleted'
        }])
    }
}

const updateFavById = (req,res)=>{
    const idRequest = req.params.id
    const favRequest = req.body.favorited
    let findFav = songsJson.find((song)=> song.id == idRequest)

    if (findFav) {
        findFav.favorited = favRequest
        res.status(200).json([{
            message: 'Ratings updated',
            songsJson
        }])
    } else {
        res.status(404).json([{
            message: 'Not found'
        }])
    }

}

module.exports ={
    getAllSongs,
    getSongById,
    getByArtist,
    addSong,
    updateSongById,
    deleteById,
    updateFavById
}