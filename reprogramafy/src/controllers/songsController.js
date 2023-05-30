// IMPORTS
const songsJson = require('../models/songs.json')

// METHODS
const addSong = (req, res) => {
  try {
    let titleRequest = req.body.title
    let launchYearRequest = req.body.launchYear
    let favoritedRequest = req.body.favorited
    let artistsRequest = req.body.artists

    let newSong = {
      id: Math.floor(Date.now() * Math.random()).toString(36),
      title: titleRequest,
      launchYear: launchYearRequest,
      favorited: favoritedRequest,
      artists: artistsRequest
    }

    songsJson.push(newSong)
    res.status(201).json([{
      message: "Resource created!"
    }])
  } catch (err) {
    console.log(err)
    res.status(500).send([{
      message: "Server Error!"
    }])
  }
}

const getAllSongs = (req, res) => {
  try {
    res.status(200).json([{
      message: "OK!",
      songs: songsJson
    }])
  } catch (err) {
    res.status(404).send([{
      message: 'Not found!'
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
      message: "Not found!"
    }])
  }
}

const getByArtists = (req, res) => {
  let artistsRequest = req.query.artists.toLowerCase()
  let artistsFilter = songsJson.filter((song) => {
    artistsLowerCase = song.artists.map((artistsArray) => artistsArray.toLowerCase())
    return artistsLowerCase.includes(artistsRequest)
  })

  console.log(artistsFilter);
  if (artistsFilter.length > 0) {
    res.status(200).send(artistsFilter)
  } else {
    res.status(404).send([{
      message: "Not found!"
    }])
  }
}

const updateSong = (req, res) => {
  const idRequest = req.params.id
  let songRequest = req.body
  let songIndex = songsJson.findIndex((song) => song.id == idRequest)
  songsJson.splice(foundSong, 1, songRequest)

  if (songsJson[songIndex] == songRequest) {
    res.status(200).json([{
      message: "Resource updated!"
    }])
  } else {
    res.status(500).send([{
      message: "Server Error!"
    }])
  }
}

const updateFav = (req, res) => {
  const idRequest = req.params.id 
  const favRequest = req.body.favorited
  songIndex = songsJson.findIndex((song) => song.id == idRequest)

  if (songIndex != -1) {
    songsJson[songIndex].favorited = favRequest
    res.status(200).json([{
      message: "Resource updated!"
    }])
  } else {
    res.status(500).send([{
      message: "Server Error!"
    }])
  }
}

const deleteSong = (req, res) => {
  const idRequest = req.params.id
  const songIndex = songsJson.findIndex((song) => song.id == idRequest)
  songsJson.splice(songIndex, 1)

  if (songsJson[songIndex].id != idRequest) {
    res.status(200).json([{
      message: "Resource Deleted!"
    }])
  } else {
    res.status(500).send([{
      message: "Server Error!"
    }])
  }
}

// EXPORTS
module.exports = {
  addSong,
  getAllSongs,
  getSong,
  getByArtists,
  updateSong,
  updateFav,
  deleteSong
}