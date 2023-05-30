const songsJson = require("../models/songs.json");

const getAllSongs = (req, res) => {
  try {
    res.status(200).json([{
        songs: songsJson,
      }]);

  } catch (error) {
    res.status(500).send([{
        message: "Erro no server"
      }]);
  }
};

const getSong = (req, res) => {
  const songRequest = req.params.id;
  const songFilter = songsJson.filter((song) => song.id == songRequest);

  if (songFilter.lenght > 0) {
    res.status(200).send(songFilter);
  } else {
    res.status(404).send([{
        message: "Não foi encontrado "
      }]);
  }
};

const getArtits = (req, res) => {
  let artistsRequest = req.query.artists.toLowerCase();
  let artistsFilter = songsJson.filter((song) => {
    artistsLowerCase = song.artists.map((artistsArray) =>
      artistsArray.toLowerCase());

    return artistsLowerCase.includes(artistsRequest);
  });

  console.log(artistsFilter);
  if (artistsFilter.length > 0) {
    res.status(200).send(artistsFilter);
  } else {
    res.status(404).send([
      {
        message: "Artista não encontrado!!!"
      }]);
  }
};

const addSong = (request, response) => {
  try {
    let titleRequest = request.body.title;
    let launchYearRequest = request.body.launchYear;
    let favoritedRequest = request.body.favorited;
    let artistRequest = request.body.artist;

    let newSong = {
      id: Math.floor(Date.now() * Math.random()).toString(36),
      title: titleRequest,
      launchYear: launchYearRequest,
      favorited: favoritedRequest,
      artist: artistRequest,
    };
    songsJson.push(newSong);
    response.status(201).json([{
        message: "Nova música cadastrada"
      }]);

  } catch (error) {
    console.log(error);
    response.status(500).send([{
        message: "Erro interno ao cadastrar"
      }]);
  }
};

const updateSong = (req, res) => {
  const idRequest = req.params.id;
  let songRequest = req.body;
  let findSong = songsJson.findIndex((song) => song.id == idRequest);

  if (songsJson.splice(findSong, 1, songRequest)) {
    res.status(200).json([{
        message: "Música atualizada com sucesso!"
      }]);

  } else {
    res.status(404).send([{
        message: "Música não encontrada"
      }]);
  }
};

const deleteSong = (req, res) => {
  const idRequest = req.params.id;
  const findSong = songsJson.findIndex((song) => song.id == idRequest);

  songsJson.splice(findSong, 1);

  if (findSong) {
    res.status(200).json([{
        massage: "a música seleciona foi deletada!",
        songsJson,
      }]);

  } else {
    res.status(404).send([{
        massage: "Música não deletada!",
      }]);
  }
};

const updateFav = (req, res) => {
  const idRequest = req.params.id;
  const favoritedRequest = req.body.favorited;
  favoritedFind = songsJson.find((song) => song.id == idRequest);

  if (favoritedFind) {
    favoritedFind.favorited = favoritedRequest;
    res.status(200).json([{
        message: "Classificação atualizada com sucesso!!",
      }])

  } else {
    res.status(404).json([{
        message: "Não foi possivel atualizar",
      }]);
  }
};

module.exports = {
  getAllSongs,
  getSong,
  getArtits,
  addSong,
  updateSong,
  deleteSong,
  updateFav,
};
