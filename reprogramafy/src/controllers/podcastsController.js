const reprogramafyPodcasts = require("../models/podcasts.json")

const getAllPods = (request, response) => {
    try {
        response.status(200).json([{
            podcast: podsJson
        }])
    } catch (err) {
        response.status(500).send([{
            message: "Erro no Server"
        }])
    }
}

const getTopics = (request, response) => {
    const topicRequest = request.query.topic
    const topicFilter = podsJson.filter((pods) => pods.topic.includes(topicRequest))
    if (topicFilter.length > 0) {
        response.status(200).send(topicFilter)
    } else {
        response.status(404).send([{
            message: "Podcast ot Found! "
        }])
    }
}


const addPods = (req, res) => {
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
        };
        podsJson.push(newPodcast)
        res.status(201).json([{
            message: "nova podcast cadastrado",
            newPodcast
        }])
    } catch (error) {
        console.log(error)
        res.status(500).send([{
            message: "Erro interno ao cadastrar"
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
            message: "Classificação atualizada com sucesso.",
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
            message: "O podcast foi deletado.",
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
