const podJson = require("../models/podcasts.json");

const getAllPods = (req, res) => {
  try {
    res.status(200).json([{
        podcasts: podJson,
      }]);
  } catch (err) {
    res.status(500).send([{
        message: "Erro no server",
      }]);
  }
};

const getTopic = (req, res) => {
  const topicRequest = req.query.topic;
  const topicFilter = podJson.filter((pods) =>
    pods.topic.includes(topicRequest));

  if (topicFilter.length > 0) {
    res.status(200).send(topicFilter);
  } else {
    res.status(404).send([{
        message: "Podcast não encontrado!!"
      }]);
  }
};

const addPods = (req, res) => {
  try {
    let nameRequest = req.body.name;
    let podcasterRequest = req.body.podcaster;
    let topicRequest = req.body.topic;
    let starsRequest = req.body.stars;

    let newPodcast = {
      id: Math.floor(Date.now() * Math.random()).toString(36),
      name: nameRequest,
      podcaster: podcasterRequest,
      topic: topicRequest,
      stars: starsRequest,
    };
    podJson.push(newPodcast);
    response.status(201).json([{
        message: "Novo Podcast cadastrado.",
        newPodcast,
      }]);

  } catch (error) {
    console.log(error);
    res.status(500).send([{
        message: "Erro interno ao cadastrar!!",
      }]);
  }
};

const updatePods = (req, res) => {
  const idRequest = req.params.id;
  const startRequest = req.body.stars;
  startFind = podJson.find((podcast) => podcast.id == idRequest);

  if (starsFind) {
    starsFind.stars = startRequest;
    res.status(200).json([{
        message: "Classificação atualizada com sucesso!",
        podJson,
      }]);

  } else {
    res.status(404).json([{
        message: "Não foi modificado.",
      }]);
  }
};

const deletePods = (req, res) => {
  const idRequest = req.params.id;
  const indicePods = podJson.findIndex((podcast) => podcast.id == idRequest);

  podJson.splice(indicePods, 1);

  if (indicePods) {
    res.status(200).json([{
        message: "o podcast foi deletado",
        "podcast deletado": idRequest,
        podJson,
      }]);
  } else {
    res.status(404).send([{
        massage: "Podcast não deletado",
      }]);
  }
};

module.exports = {
  getAllPods,
  getTopic,
  addPods,
  updatePods,
  deletePods,
};
