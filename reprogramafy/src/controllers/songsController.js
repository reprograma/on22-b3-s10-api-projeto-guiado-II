const songsJson = require("../models/songs.json");

const getAllSongs = (request, response) => {
  try {

    console.log(request)
    //tente pegar essa informação
    response.status(200).json([
      {
        songs: songsJson,
      },
    ]);
  } catch (err) {
    //se não pegar, manda a msg de erro
    response.status(500).send([
      {
        //500 é status de erro de servidor
        message: "erro no server",
      },
    ]);
  }
};

const getSong = (request, response) => {
  const songRequest = request.params.id;
  const songFilter = songsJson.filter((song) => song.id == songRequest);

  if (songFilter.length > 0) {
    response.status(200).send(songFilter);
  } else {
    response.status(404).send([
      {
        message: "Song not foud!",
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
        message: "Artist not found!",
      },
    ]);
  }
};

const addSong = (req, res) => {
  try {
    let titleRequest = req.body.title;
    let launchYearRequest = req.body.launchYear;
    let favoritedRequest = req.body.favorited;
    let artistsRequest = req.body.artists;

    let newSong = {
      id: Math.floor(Date.now() * Math.random()).toString(36),
      title: titleRequest,
      launchYear: launchYearRequest,
      favorited: favoritedRequest,
      artists: artistsRequest,
    };
    songsJson.push(newSong);
    res.status(201).json([
      {
        message: "Nova música cadastrada!!!/ Add New Song!!",
        newSong,
      },
    ]);
  } catch (error) {
    console.log(error);
    res.status(500).send([
      {
        message: "Erro interno ao cadastrar!!!",
      },
    ]);
  }
};

const updateSong = (request, response) => {
  const idRequest = req.params.id;
  let songRequest = req.body;
  let findSong = songsJson.findIndex((song) => song.id == idRequest);

  if (songsJson.splice(findSong, 1, songRequest)) {
    response.status(200).json([
      {
        message: "Musica atualizada com sucesso!!/ Update songs sucess!!",
        songsJson,
      },
    ]);
  } else {
    response.status(404).send([
      {
        message: "Musica não encontrado!!",
      },
    ]);
  }
};

const deleteSong = (request, response) => {
  const idRequest = req.params.id;
  const songFilter = songsJson.findIndex((song) => song.id == idRequest);
  songsJson.splice(songFilter, 1);
  if (songFilter) {
    response.status(200).json([
      {
        message: "A musica selecionada foi deletada!!",
        "musica deletada": idRequest,
        songsJson,
      },
    ]);
  } else {
    response.status(404).send([
      {
        message: "Musica não deletada!!!",
      },
    ]);
  }
};

const updateFav = (request, response) => {
  const idRequest = request.params.id;
  const favoritedRequest = req.body.favorited;
  favoritedFind = songsJson.find((song) => song.id == idRequest);

  if (favoritedFind) {
    (favoritedFind.favorited = favoritedRequest),
      response.status(200).json([
        {
          message: "Classificação atualizada com Sucesso!!",
        },
      ]);
  } else {
    response.status(404).json([
      {
        message: "Não quero hoje!!!",
      },
    ]);
  }
};

module.exports = {
  getAllSongs,
  getSong,
  getArtist,
  addSong,
  updateSong,
  deleteSong,
  updateFav,
};
