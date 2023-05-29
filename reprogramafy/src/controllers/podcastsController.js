const podsJson = require('../models/podcasts.json')

const addPodcast = (req, res) => {
  try {
    let nameRequest = req.body.name
    let podcasterRequest = req.body.podcaster
    let topicRequest = req.body.topic
    let starsRequest = req.body.stars

    let newPodcast = {
      id: Math.floor(Date.now() * Math.random()).toString(36),
      name: nameRequest,
      podcaster: podcasterRequest,
      topic: topicRequest,
      stars: starsRequest
    }

    podsJson.push(newPodcast)
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

const getAllPods = (req, res) => {
  try {
    res.status(200).json([{
      podcastsJson: podsJson
    }])
  } catch (err) {
    res.status(500).send([{
      message: 'Server Error!'
    }])
  }
}

const getTopics = (req, res) => {
  const topicRequest = req.query.topic
  const topicFilter = podsJson.filter((pods) => pods.topic.includes(topicRequest))
  if (topicFilter.length > 0) {
    res.status(200).send(topicFilter)
  } else {
    res.status(404).send([{
      message: "Not found!"
    }])
  }
}

const updatePodcast = (req, res) => {
  const idRequest = req.params.id
  let starsRequest = req.body.stars
  let foundPod = podsJson.findIndex((podcast) => podcast.id == idRequest)

  if (foundPod) {
    foundPod.stars = starsRequest
    res.status(200).json([{
      message: "Resource updated!",
      podsJson
    }])
  } else {
    res.status(404).send([{
      message: "Not Updated!"
    }])
  }
}

const deletePodcast = (req, res) => {
  const idRequest = req.params.id
  const podIndex = podsJson.findIndex((podcast) => podcast.id == idRequest)

  podsJson.splice(podIndex, 1)

  if (!podsJson[podIndex]) {
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
  addPodcast,
  getAllPods,
  getTopics,
  updatePodcast,
  deletePodcast
}