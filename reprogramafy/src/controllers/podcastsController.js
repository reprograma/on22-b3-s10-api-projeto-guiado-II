const podsJson = require("../models/podcasts.json")

const getAllPods = (req, res) => {
  try {
    res.status(200).json([{
      podcasts: podsJson
    }])
  } catch (err) {
    res.status(500).send([{
      message: "erro no serer"
    }])
  }
}

const getTopics = (req, res) => {
  const topicRequest = req.query.topic;
  const topicFilter = podsJson.filter((pods) => pods.topic.includes(topicRequest))
  if (topicFilter.lenght > 0){
    res.status(200).send(topicFilter)
  } else {
    res.status(404).send([{
      message: "pod não encontrado!"
    }])
  }
}

const addPods = (req, res) => {
  try {
    let nameRequest = req.body.name;
    let podcasterRequest = req.body.podcaster;
    let topicRequest = req.body.topic;
    let starsRequest = req.body.stars;

    let newPod = {
      id: Math.floor(Date.now() * Math.random()).toString(36),
      name: nameRequest,
      podcaster: podcasterRequest,
      topic: topicRequest,
      stars: starsRequest
    }
    podsJson.push(newPod);
    res.status(201).json([{
      message: "new pod registered :D",
      newPod
    }])
  } catch (error) {
    console.log(error)
    res.status(500).send([{
      message: "error :("
    }])
  }
}

const updatePods = (req, res) => {
  const idRequest = req.params.id
  const starsRequest = req.body.stars
  starsFind = reprogramafyPodcasts.find(podcast => podcast.id == idRequest)
  if (starsFind) {
      starsFind.stars = starsRequest
      res.status(200).json([{
          message: "Classificação atualizada :D",
          reprogramafyPodcasts
      }])
  } else {
      res.status(404).json([{
          message: "Não foi modificado"
      }])
  }
}

const deletePods = (req, res) => {
  const idRequest = req.params.id
  const indicePods = reprogramafyPodcasts.findIndex((podcast) => podcast.id == idRequest)

  reprogramafyPodcasts.splice(indicePods, 1)

  if (indicePods) {
      res.status(200).json([{
          message: "podcast deletado",
          "podcast deletado": idRequest,
          reprogramafyPodcasts
      }])
  } else {
      res.status(404).send([{
          message: "Podcast não deletado."
      }])
  }
}



module.exports = {
  getAllPods,
  getTopics,
  addPods,
  updatePods,
  deletePods

}




/* const pods = require("../models/podcasts.json");

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
  updatePods,
  deletePods,
};




 */