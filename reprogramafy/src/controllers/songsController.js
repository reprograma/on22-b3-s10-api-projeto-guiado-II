const songsJson = require("../models/songs.json");

const getAllSongs = (_req, res) => {
  try {
		res.status(200).json([{
			Songs: songsJson
		}]);
	} catch (error) {
		res.status(500).send([{
			message: "Erro no server"
		}]);
	}
}

const getSongId = (req, res) => {
	const songSequest = req.params.id;
	const songFilter = songsJson.filter((song) => song.id == songSequest);
	if (songFilter.length > 0) {
		res.status(200).send(songFilter)
	} else {
		res.status(404).send([{
			message: "Song Not Found"
		}]);
	}
}

const getArtist = (req, res) => {
	let artistRequest = req.query.artists.toLowerCase();
	let artistFilter = songsJson.filter((song) => {
		artistsLowerCase = song.artists.map((artistsArray) => artistsArray.toLowerCase());
		return artistsLowerCase.includes(artistRequest);
	});
	console.log(artistFilter);
	if (artistFilter.length > 0) {
		res.status(200).send(artistFilter);
	} else {
		res.status(404).send([{
			message: "Artist Not Found"
		}]);
	}
}

const addSong = (req, res)=> {
  try {
    let titleRequest = req.body.title;
    let launchYearRequest = req.body.launchYear;
    let favoritedRequest = req.body.favorited;
    let artistRequest = req.body.artists;

    let newSong = {
      id: Math.floor(Date.now() * Math.random().toString(36)),
      title: titleRequest,
      launchYear: launchYearRequest,
      favorited: favoritedRequest,
      artists: artistRequest
    };
    songsJson.push(newSong);
    res.status(201).json([{
      message: "New song registered"
    }]);
  } catch (error) {
    console.log(error);
    res.satus(500).send([{
      message: "Internal error when registering"
    }]);
  }
}

const updateSong = (req, res) => {
  const idRequest = req.params.id;
  let songRequest = req.body;
  let findSong = songsJson.findIndex((song) => song.id == idRequest);

  if (songsJson.splice(findSong, 1, songRequest)) {
    res.status(200).json([{
      message: "Música atualizada com sucesso", songsJson
    }]);
  } else {
    res.status(404).send([{
      message: "Song Not Found"
    }])
  }
}

const deleteSong = (req, res) => {
  const idRequest = req.params.id;
  const findSong = songsJson.findIndex((song) => song.id == idRequest);
  songsJson.splice(findSong, 1);
  if(findSong){
    res.status(200).json([{
      message: "Deleted Sucecyllify",
      "Música deletada": idRequest, 
      songsJson
    }]);
  }else{
    res.status(404).sen([{
      Message: "Música não deletada"
    }]);
  }
}

const updateFav = (req, res) => {
  const idRequest = req.params.id;
  const favoritesRequest = req.body.favorited;
  favoritedFind = songsJson.find((song) => song.id == idRequest);

  if (favoritedFind) {
    favoritedFind.favorited = favoritesRequest,
    res.status(200).json([{
      message: "Classificação atualizada com sucesso"
    }]);
  } else {
    res.status(404).json([{
      message: "Não alterou"
    }])
  }
}

module.exports = {
	getAllSongs,
	getSongId,
	getArtist,
  addSong,
  updateSong,
  deleteSong,
  updateFav
}