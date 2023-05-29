const podJson = require('../models/podcasts.json')

const getAllPods = (req, res) => {
    try {
        res.status(200).json([{
            podcast: podJson
        }])
    } catch (err) {
        res.status(500).send([{
            message: 'erro no server'
        }])
    }
}

const getTopics = (req, res) => {
    const topicRequest = req.query.topic
    const topicFilter = podsJson.filter((pods) => pods.topic.includes(topicRequest))
    if(topicFilter.length > 0){
        res.status(200).send(topicFilter) 
        } else {
            res.status(404).send([{
                message: 'pod '
            }])
        }
    }

const addPods = (req,res) => {
    try {
        let nameRequest = req.body.name
        let podcasterRequest = req.body.podcaster
        let topicRequest = req.body.topic
        let starsRequest = req.body.stars

        let newPodcast = {
            id: Math.floor(Date.now() * Math.random()).toString(36),
            nome: nameRequest,
            podcaster: podcasterRequest,
            topic: topicRequest,
            stars: starsRequest
        }
        podJson.push(newPodcast)
        res.status(201).json([{
            message: 'novo podcast cadastrado', newPodcast
        }])
    } catch (error) {
        console.log(error)
        res.status(500).send([{
            message: 'erro interno ao cadastrar'
        }])
    }
}

const updatePods = (req, res) => {
    const idRequest = req. params.id
    const starsRequest = req.body.stars 
    starsFind = podJson.find((podcast) => podcast.id == idRequest)

    if (starsFind) {
        starsFind.stars = starsRequest
        res.status(200).json([{
            message: 'classificação atualizada', podJson
        }])
    } else {
        res.status(404).json([{
            message: 'n foi modificado', 
            
        }])
    }
}

const deletePods = (req, res) => {
    const idRequest = req.params.id
    const indicePods = podJson.findIndex((podcast) => podcast.id == idRequest)

    podJson.splice(indicePods, 1)

    if (indicePods) {
        res.status(200).json([{
            message: 'podcast deletao', 
            'podcast deletada': idRequest, podJson
        }])
    } else {
        res.status(404).send([{
            message: 'podcast não deletado'
        }])
    }
}

module.exports = {
    getAllPods, getTopics, addPods , updatePods, deletePods
}