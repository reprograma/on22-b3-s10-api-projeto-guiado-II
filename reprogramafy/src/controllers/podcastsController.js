const podsJson = require("../models/podcasts.json")

const getAllPods = (req, res) => {
    try {
        res.status(200).json([{
            podcasts : podsJson
        }])
    } catch (err) {
        res.status(500).send([{
            message: "erro no server"
        }])
    }
}

const getTopics = (req, res) => {
    const topicRequest = req.query.topic;
    const topicFilter = podsJson.filter((pods) => pods.topic.includes(topicRequest))
    if(topicFilter.length > 0) {
        res.status(200).send(topicFilter)
    }else {
        res.status(404).send([{
            message: "podcast não encontrado"
        }])
    }
}

const addPods = (req,res) => {
    try {
        let nameRequest = req.body.name;
        let podcasterRquest = req.body.podcaster;
        let topicRequest = req.body.topic;
        let starsRequest = req.body.stars

        let newPodcast = {
            id: Math.floor(Date.now() * Math.random()).toString(36),
            name: nameRequest,
            podcaster: podcasterRquest,
            topic: topicRequest,
            stars: starsRequest
        }
        podsJson.push(newPodcast);
        res.status(201).json([{
            message: "Novo podcast cadastrado!!",
            newPodcast
        }])
    } catch (err) {
        console.log(err)
        res.status(500).send([{
            message: "erro interno ao cadastrar :("
        }])
    }
}

const updatePods = (req, res) => {
    const idRequest = req.params.id
    const starsRquest = req.body.stars
    starsFind = podsJson.find((podcast) => podcast.id == idRequest)

    if(starsFind) {
        starsFind.stars = starsRquest
        res.status(200).json([{
            message: "stars atualizada com sucesso :D"
        }])
    }else {
        res.status(404).json([{
            message: "não foi modificado :("
        }])
    }
}

const deletePods = (req, res) => {
    const idRequest = req.params.id
    const indicePods = podsJson.findIndex((podcast) => podcast.id == idRequest)

    podsJson.splice(indicePods, 1)

    if(indicePods) {
        res.status(200).json([{
            message: "o podcast foi deletado :D",
            "podcast deletado": idRequest,
            podsJson
        }])
    }else {
        res.status(404).send([{
            message: "podcast não deletado :("
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