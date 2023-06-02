const pods = require("../models/podcasts.json");

const getAllPods = (request, response) => {
  try {
    response.status(200).json([
      {
        Podcast: pods,
      },
    ]);
  } catch (err) {
    response.status(500).send({ message: "Erro no server" });
  }
};

const getTopics = (request, response) => {
  const topicRequest = request.query.topic;
  const topicFilter = pods.filter((pods) => pods.topic.includes(topicRequest));
  if (topicFilter.length > 0) {
    response.status(200).send(topicFilter);
  } else {
    response.status(404).send([
      {
        message: "Topico não encontrado",
      },
    ]);
  }
};
//const reqs = {name, bla, bla , bla} = req.body
const addPods = (request, response) => {
  try {
    let nameRequest = request.body.name;
    let podcasterRequest = request.body.podcaster;
    let topicRequest = request.body.topic;
    let starsRequest = request.body.stars;

    let newPodcast = {
      id: Math.floor(Date.now() * Math.random()).toString(36),
      name: nameRequest,
      podcaster: podcasterRequest,
      topic: topicRequest,
      stars: starsRequest,
    };

    pods.push(newPodcast);
    response.status(201).json([
      {
        message: "Novo podcast cadastrado",
        newPodcast,
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

const atualizarPods = (request, response) => {
  const idRequest = request.params.id;
  const starsRequest = request.body.stars;
  starsFilter = pods.find((podcast) => podcast.id == idRequest);

  if (starsFilter) {
    starsFilter.stars = starsRequest;
    response.status(200).json([
      {
        message: "Classificação atualizada com sucesso, honey",
        pods,
      },
    ]);
  } else {
    response.status(404).json([
      {
        message: "Não foi modificado garotah sonsa",
      },
    ]);
  }
};

const deletePods = (request, response) => {
  const idRequest = request.params.id;
  const indicePods = pods.findIndex((podcast) => podcast.id == idRequest);

  pods.splice(indicePods, 1);

  if (indicePods) {
    response.status(200).json([
      {
        message: "O podcast selecionado foi deletado",
        "podcast deletado": idRequest,
        pods,
      },
    ]);
  } else {
    response.status(404).send([
      {
        message: "Podcast não deletado",
      },
    ]);
  }
};

module.exports = {
  getAllPods,
  getTopics,
  addPods,
  atualizarPods,
  deletePods,
};




