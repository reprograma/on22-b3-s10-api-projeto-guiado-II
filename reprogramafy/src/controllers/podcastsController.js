const podsJson = require("../models/podcasts.json");

const getAllPods = (_req, res) => {
	try {
		res.status(200).json([{
			Podcasts: podsJson
		}]);
	} catch (err) {
		res.status(500).send([{
			message: "Erro no server"
		}]);
	}
}

const getTopics = (req, res) => {
  const topicRequest = req.query.topic;
  const topicFilter = podsJson.filter((pods)=> pods.topic.includes(topicRequest));
  if(topicFilter.length > 0){
    res.status(200).send(topicFilter);
  } else {
    res.status(404).send([{
      message: "Podcast Not Found"
    }]);
  }
}

const addPods = (req, res) => {
  try {
    let nameRequest = req.body.name;
    let podcasterRequest = req.body.podcaster;
    let topicRequest = req.body.topic;
    let starRequest = req.body.stars;

    let newPodcast = {
      id: Math.floor(Date.now() * Math.random()).toString(36),
      name: nameRequest,
      podcaster: podcasterRequest,
      topic: topicRequest,
      stars: starRequest
    }
    podsJson.push(newPodcast);
    res.status(201).json([{
      message: "New podcast registered", newPodcast
    }]);

  } catch (error) {
    console.log(error);
    res.status(500).send([{
      message: "Internal error when registering"
    }]);
  }
}

const updatePods = (req, res) => {
  const idRequest = req.params.id;
  const starsRequest = req.body.stars;
  starsFind = podsJson.find((podcast) => podcast.id == idRequest);

  if (starsFind) {
    starsFind.stars = starsRequest;
    res.status(200).json([{
      message: "Classificação atualizada com sucesso", podsJson
    }]);
  } else {
    res.status(404).json([{
      message: "Não foi modificado"
    }]);
  }
}

const deletePods = (req, res) => {
  const idRequest = req.params.id;
  const indicePods = podsJson.findIndex((podcast) => podcast.id == idRequest);
  podsJson.splice(indicePods, 1);

  if (indicePods) {
    res.status(200).json([{
      message: "ghghvjh",
      "podcast deletado": idRequest,
      podsJson
    }]);
  } else {
    res.status(404).send([{
      message: "Deleted Not Found"
    }]);
  }
}


module.exports = {
	getAllPods,
  getTopics,
  addPods,
  updatePods,
  deletePods
}