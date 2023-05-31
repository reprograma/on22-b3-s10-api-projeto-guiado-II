// IMPORTS
const podsJson = require('../models/podcasts.json')

// METHODS
const addPodcast = (req, res) => {
  try {
    let nameReq = req.body.name
    let casterReq = req.body.podcaster
    let topicReq = req.body.topic
    let starsReq = req.body.stars

    let newPod = {
      id: Math.floor(Date.now() * Math.random()).toString(36),
      name: nameReq,
      podcaster: casterReq,
      topic: topicReq,
      stars: starsReq
    }

    if ((podsJson.findIndex((podcast) => podcast.name == nameReq)) == -1) {
      podsJson.push(newPod)
      res.status(201).json([{
        message: "Resource Created!",
        podsJson
      }])
    }
    
    res.status(200).send([{
        message: "Not Modified!",
        podsJson
    }])
    
  } catch (err) {
    console.log(err)
    res.status(500).send([{
      message: "Server Error!"
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
  const nameRequest = req.params.name.toLowerCase()
  const foundPod = podsJson.find((podcast) => podcast.name.toLowerCase() == nameRequest)

  if (foundPod.name.toLowerCase() == nameRequest) {
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
  const topicReq = req.query.topic
  const filterByTopic = podsJson.filter((podcast) => podcast.topic.includes(topicReq))
  if (filterByTopic.length > 0) {
    res.status(200).json([{
      filterByTopic
    }])
  } else {
    res.status(404).send([{
      message: "Not found!"
    }])
  }
}



const updatePod = (req, res) => {
  const idRequest = req.params.id
  let podRequest = req.body
  let podIndex = podsJson.findIndex((podcast) => podcast.id == idRequest)
  podRequest.id = +idRequest
  podsJson.splice(podIndex, 1, podRequest)


  if (podsJson[podIndex] == podRequest) {
    res.status(200).json([{
      message: "Resource updated!",
      podsJson
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
  console.log(starsRequest)
  if ((podIndex != -1) && (starsRequest > 0) && (starsRequest <= 5)) {
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
  let idRequest = req.params.id
  let podIndex = podsJson.findIndex((podcast) => podcast.id == idRequest)

  podsJson.splice(podIndex, 1)

if (podIndex != -1) {
    podsJson.splice(podIndex, 1)
    res.status(200).json([{
    message: "Resource deleted!"
    }])
  } else if (podIndex = -1) { 
    res.status(404).send([{
      message: "Not Found!"
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