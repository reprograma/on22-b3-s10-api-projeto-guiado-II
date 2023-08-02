/*const music = require("../models/songs.json");

const getAllMusic = (request, response) => {
  try {
    response.status(200).json([
      {
        Musicas: music,
      },
    ]);
  } catch (err) {
    response.status(500).send({ message: "Erro no server" });
  }
};

const getMusic = (request, response) => {
  const musicRequest = request.params.id;
  const musicFilter = music.filter((music) => music.id == musicRequest);

  if (musicFilter.length > 0) {
    response.status(200).send(musicFilter);
  } else {
    response.status(404).send([
      {
        message: "Musica não encontrada",
      },
    ]);
  }
};

const getArtist = (request, response) => {
  let artistsRequest = request.query.artists.toLowerCase();

  let artistsFilter = music.filter((musica) => {
    artistasLowerCase = musica.artists.map((artistasArray) =>
      artistasArray.toLowerCase()
    );
    return artistasLowerCase.includes(artistsRequest);
  });
  console.log(artistsFilter);
  if (artistsFilter.length > 0) {
    response.status(200).send(artistsFilter);
  } else {
    response.status(404).send([
      {
        message: "Artista não encontrado",
      },
    ]);
  }
};

const addMusic = (request, response) => {
  try {
    let titleRequest = request.body.title;
    let launchYearRequest = request.body.launchYear;
    let favoritedRequest = request.body.favorited;
    let artistsRequest = request.body.artists;

    let newMusic = {
      id: Math.floor(Date.now() * Math.random()).toString(36),
      title: titleRequest,
      launchYear: launchYearRequest,
      favorited: favoritedRequest,
      artists: artistsRequest,
    };

    music.push(newMusic);
    response.status(201).json([
      {
        message: "Nova musica cadastrada",
        newMusic,
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

const updateMusic = (request, response) => {
  const idRequest = request.params.id;
  let musicRequest = request.body;

  let indexEncontrado = music.findIndex((musica) => musica.id == idRequest);

  if (music.splice(indexEncontrado, 1, musicRequest)) {
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

const deleteMusic = (request, response) => {
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
  getAllMusic,
  getArtist,
  getMusic,
  addMusic,
  updateMusic,
  deleteMusic,
  updateFav
};
*/