const { request, response } = require('express')
const podsJson = require('../models/podcasts.json')

const getAllPods = (request, response) => {
    try {
        response.status(200).json([{
            pods: podsJson
        }])
    } catch (error) {
        response.status(500).send([{
            message:'Erro no servidor'
        }])
    }
}

const getTopics = (request, response) => {
    const topics = request.query.topic
    const filter = podsJson.filter(pods => pods.topic.includes(topics))
    if (filter.length > 0) {
        response.status(200).send(filter)
    } else {
        response.status(404).send([{
            message: 'Not found!'
        }])
    }
}

const addPods = (request, response) => {
    try {
        let name = request.body.name;
        let podcaster = request.body.podcaster
        let topic = request.body.topic
        let stars = request.body.stars
        
        let newPodcast = {
            id: Math.floor(Date.now() * Math.random()).toString(36),
            name: name,
            podcaster: podcaster,
            topic: topic,
            stars: stars
        }
        podsJson.push(newPodcast);
        response.status(201).json([{
            message: 'Novo podcast cadastrado',
            newPodcast
        }])
    } catch (error) {
        console.log(error)
        response.status(500).send([{
            message: 'Erro interno ao cadastrar'
        }])
    }
}


module.exports = {
    getAllPods,
    getTopics,
    addPods
}