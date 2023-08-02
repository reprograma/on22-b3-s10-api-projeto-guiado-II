const reprogramafyPodcasts = require("../models/podcasts.json")

const getAllPodcasts = (request, response) => {
    try {
        response.status(200).json([{
            podcast: reprogramafyPodcasts
        }])
    } catch (error) {
        response.status(500).send([{
            message: "Erro no servidor."
        }])
    }
}

const getTopics = (request, response) => {
    const topicRequest = request.query.topic
    const topicFilter = reprogramafyPodcasts.filter((pods) => pods.topic.includes(topicRequest))
    if (topicFilter.length > 0) {
        response.status(200).send(topicFilter)
    } else {
        response.status(404).send([{
            message: "Erro no servidor, Podcast não encontrado."
        }])
    }
}

const addPodcasts = (request, response) => {
    try {
        let nameRequest = request.body.name
        let podcasterRequest = request.body.podcaster
        let topicRequest = request.body.topic
        let starsRequest = request.body.stars

        let newPodcast = {
            id: Math.floor(Date.now() * Math.random()).toString(36),
            name: nameRequest,
            podcaster: podcasterRequest,
            topic: topicRequest,
            stars: starsRequest,
        }
        reprogramafyPodcasts.push(newPodcast)
        response.status(201).json([{
            message: "Novo podcast cadastrado",
            newPodcast
        }])

    } catch (error) {
         console.log(error)
        response.status(500).send([{
            message: "Erro interno ao cadastrar podcast."
        }])
    }
}

const updatePodcasts = (request, response) => {
    const idRequest = request.params.id 
    const starsRequest = request.body.stars 
    starsFind = reprogramafyPodcasts.find((podcast) => podcast.id == idRequest)

    if (starsFind) {
        starsFind.stars = starsRequest
        response.status(200).json([{
            message: "Classificação atualizada com sucesso.",
            reprogramafyPodcasts
        }])
    } else {
        response.status(404).json([{
            message: "Não foi modificado."
        }])
    }
}

const deletePodcasts = (request, response) =>{
    const idRequest = request.params.id
    const indicePods = reprogramafyPodcasts.findIndex((podcast) => podcast.id == idRequest) 

    reprogramafyPodcasts.splice(indicePods, 1)

    if (indicePods) {
        response.status(200).json([{
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
    getAllPodcasts,
    getTopics,
    addPodcasts,
    updatePodcasts,
    deletePodcasts,
}