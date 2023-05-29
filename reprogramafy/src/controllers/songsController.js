const songsJson = require('../models/songs.json')

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
      message: "Internal Error!"
    }])
  }
}

const getAllSongs = (req, res) => {
  try {
    res.status(200).json([{
      songs: songsJson
    }])
  } catch (err) {
    res.status(500).send([{
      message: 'Server Error!'
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

const getArtist = (req, res) => {
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
  let foundSong = songsJson.findIndex((song) => song.id == idRequest)

  if (songsJson.splice(foundSong, 1, songRequest)) {
    res.status(200).json([{
      message: "Resource updated!"
    }])
  } else {
    res.status(404).send([{
      message: "Not Found!"
    }])
  }
}

const updateFav = (req, res) => {
  const idRequest = req.params.id 
  const favoritedRequest = req.body.favorited
  foundFavorited = songsJson.json((song) => song.id == idRequest)

  if (foundFavorited) {
    res.status(200).json([{
      message: "Resource updated!"
    }])
  } else {
    res.status(404).send([{
      message: "Not Found!"
    }])
  }
}

const deleteSong = (req, res) => {
  const idRequest = req.params.id
  const foundSong = songsJson.findIndex((song) => song.id == idRequest)

  songsJson.splice(foundSong, 1)

  if (!songsJson[foundSong]) {
    res.status(200).json([{
      message: "Resource deleted!"
    }])
  } else {
    res.status(404).send([{
      message: "Not Deleted!"
    }])
  }
}

module.exports = {
  addSong,
  getAllSongs,
  getSong,
  getArtist,
  updateSong,
  updateFav,
  deleteSong
}