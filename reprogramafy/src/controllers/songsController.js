const songsJson = require("../models/songs.json");

const getAllSongs = (request, response) => {
  try {
    response.status(200).json([
      {
        songs: songsJson,
      },
    ]);
  } catch (error) {
    response.status(500).send({ 
      message: "Erro no server" });
  }
};

const getSongs = (request, response) => {
  const songsRequest = request.params.id;
  const songsFilter = songsJson.filter((song) => song.id == songsRequest);

  if (songsFilter.length > 0) {
    response.status(200).send(songsFilter);
  } else {
    response.status(404).send([
      {
        message: "Not found!",
      },
    ]);
  }
};

const getArtist = (request, response) => {
  let artistsRequest = request.query.artists.toLowerCase();

  let artistsFilter = songsJson.filter((song) => {
    artistsLowerCase = song.artists.map((artistsArray) =>
      artistsArray.toLowerCase()
    );
    return artistsLowerCase.includes(artistsRequest);
  });
  console.log(artistsFilter);
  if (artistsFilter.length > 0) {
    response.status(200).send(artistsFilter);
  } else {
    response.status(404).send([
      {
        message: "Not found!",
      },
    ]);
  }
};

const addSong = (request, response) => {
  try {
    let titleRequest = request.body.title;
    let launchYearRequest = request.body.launchYear;
    let favoritedRequest = request.body.favorited;
    let artistsRequest = request.body.artists;

    let newSong = {
      id: Math.floor(Date.now() * Math.random()).toString(36),
      title: titleRequest,
      launchYear: launchYearRequest,
      favorited: favoritedRequest,
      artists: artistsRequest,
    };

    songsJson.push(newSong);
    response.status(201).json([
      {
        message: "Nova musica cadastrada",
        newSong,
      },
    ]);
  } catch (err) {
    console.log(err);
    response.status(500).send([
      {
        message: "Erro interno ao cadastrar",
      },
    ]);
  }
};

const updateSongs = (request, response) => {
  const idRequest = request.params.id;
  let songRequest = request.body;

  let indexEncontrado = songsJson.findIndex((musica) => musica.id == idRequest);

  if (song.splice(indexEncontrado, 1, songRequest)) {
    response.status(200).json([
      {
        message: "Musica atualizada com sucesso",
        music,
      },
    ]);
  } else {
    response.status(404).send([
      {
        message: "Artista não encontrado",
      },
    ]);
  }
};

const deleteSongs = (request, response) => {
  const idRequest = request.params.id;
  const indiceMusic = music.findIndex((musica) => musica.id == idRequest);

  music.splice(indiceMusic, 1);

  if (indiceMusic) {
    response.status(200).json([
      {
        message: "A musica selecionada foi deletada",
        "musica deletada": idRequest,
        music,
      },
    ]);
  } else {
    response.status(404).send([
      {
        message: "Musica não deletada",
      },
    ]);
  }
};


const updateFav = (request, response) => {
  const idRequest = request.params.id;
  const favoritedRequest = request.body.favorited;
  favoritedFilter = music.find((musica) => musica.id == idRequest);

  if (favoritedFilter) {
    favoritedFilter.favorited = favoritedRequest;
    response.status(200).json([
      {
        message: "Musica atualizada com sucesso",
        music,
      },
    ]);
  } else {
    response.status(404).json([
      {
        message: "Não foi possivel realizar a alteração",
      },
    ]);
  }
};

module.exports = {
  getAllSongs,
  getArtist,
  getSongs,
  addSong,
  updateSongs,
  deleteSongs,
  updateFav
};