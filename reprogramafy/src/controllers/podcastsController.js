const podsJson = require('../models/podcasts.json')

const getAllPods = (request, response) =>{
    try {
        response.status(200).json([{
            podcasts: podsJson
        }])
    } catch (error) {
        response.status(500).send([{
            message: "erro no server"
        }])
    }
}

const getTopics = (req, res) => {
    const topicRequest = req.query.topic;
    const topicFilter = podsJson.filter((pods) => pods.topic == (topicRequest)) 
    if (topicFilter.length > 0) {
        res.status(200).send(topicFilter)
    } else {
        res.status(404).send([{
            message: "Not found"
        }])
    }
}


const addPods = (req, res) => {
    try {
        let nameRequest = req.body.name;
        let podcasterRequest = req.body.podcaster;
        let topicRequest = req.body.topic;
        let starsRequest = req.body.stars;
        
        let newPodcat = {
            id: Math.floor(Date.now() * Math.random()).toString(36),
            name: nameRequest,
            podcaster: podcasterRequest,
            topic: topicRequest,
            stars: starsRequest
        } 
        podsJson.push(newPodcat);
        res.status(201).json([{
            message: "Novo podcast",
            newPodcat
        }])
    } catch (error) {
        console.log(error)
        res.status(500).send([{
            message: "Erro interno"
        }])
    }
}

const updatePods = (req, res) => {
    const idRequest = req.params.id
    const starsRequest = req.body.stars
    starsFind = podsJson.find((podcast) => podcast.id == idRequest)

    if (starsFind) {
        starsFind.stars = starsRequest
        res.status(200).json([{
            message: "Classificação atualizada",
            podsJson
        }])
    } else {
       res.status(404).json([{
        message: "não foi modificada",
       }]) 
    }
}

const deletePods = (req, res) => {
    const idRequest = req.params.id
    const indicePods = podsJson.findIndex((podcast) => podcast.id == idRequest)

    podsJson.splice(indicePods, 1)
    if (indicePods) {
        res.status(200).json([{
            message: "O podcast foi deletado",
            "podcast deletado": idRequest,
            podsJson
        }])
    } else {
        res.status(404).send([{
            message: "Não foi possível deletar"
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