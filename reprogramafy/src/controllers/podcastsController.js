// IMPORTS
const podsJson = require('../models/podcasts.json')

// METHODS
const addPodcast = (req, res) => {
  try {
    let nameRequest = req.body.name
    let podcasterRequest = req.body.podcaster
    let topicRequest = req.body.topic
    let starsRequest = req.body.stars

    let newPod = {
      id: Math.floor(Date.now() * Math.random()).toString(36),
      name: nameRequest,
      podcaster: podcasterRequest,
      topic: topicRequest,
      stars: starsRequest
    }

    podsJson.push(newPod)
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
      message: "OK!",
      podcasts: podsJson
    }])
  } catch (err) {
    res.status(404).send([{
      message: 'Not Found!'
    }])
  }
}

const getPodByName = (req, res) => {
  const podRequest = req.params.id.toLowerCase()
  const foundPod = podsJson.find((pod) => pod.name.toLowerCase() == podRequest)

  if (foundPod.name == podRequest) {
    res.status(200).json([{
      message: "OK!",
      podcast: foundPod
    }])
  } else {
    res.status(404).send([{
      message: 'Not Found!'
    }])
  }
}

const getPodByTopic = (req, res) => {
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



const updatePod = (req, res) => {
  const idRequest = req.params.id
  let podRequest = req.body
  let podIndex = songsJson.findIndex((song) => song.id == idRequest)
  songsJson.splice(podIndex, 1, podRequest)

  if (podJson[podIndex] == podRequest) {
    res.status(200).json([{
      message: "Resource updated!"
    }])
  } else {
    res.status(500).send([{
      message: "Server Error!"
    }])
  }
}

const updateStars = (req, res) => {
  const idRequest = req.params.id
  let starsRequest = req.body.stars
  let podIndex = podsJson.findIndex((podcast) => podcast.id == idRequest)

  if (podIndex != -1) {
    podsJson[podIndex].stars = starsRequest
    res.status(200).json([{
      message: "Resource updated!",
      podsJson
    }])
  } else {
    res.status(500).send([{
      message: "Not Updated!"
    }])
  }
}

const deletePod = (req, res) => {
  const idRequest = req.params.id
  const podIndex = podsJson.findIndex((podcast) => podcast.id == idRequest)

  podsJson.splice(podIndex, 1)

  if (podsJson[podIndex].id != idRequest) {
    res.status(200).json([{
      message: "Resource deleted!"
    }])
  } else {
    res.status(500).send([{
      message: "Server Error!"
    }])
  }
}

// EXPORTS
module.exports = {
  addPodcast,
  getAllPods,
  getPodByName,
  getPodByTopic,
  updatePod,
  updateStars,
  deletePod
}