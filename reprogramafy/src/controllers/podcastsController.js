const podcastsJson = require('../models/podcasts.json')

const getAllPods = (request, response) =>{
    try {
        response.status(200).json([{
            Podcasts: podcastsJson
        }])
    } catch (error) {
        response.status(500).send([{
            Message: 'error no server'
        }])
    }
}

const getTopics = (request, response) =>{
    const topicRequest = request.query.topic;
    const topicFilter = podcastsJson.filter((podcasts)=> podcasts.topic.includes(topicRequest))
    if(topicFilter.length > 0){
    response.status(200).send(topicFilter)
    }else{
        response.status(404).send([{
            message: 'Not found!'
        }])
    }
}

const addPods = (request, response) =>{
    try {
        let nameRequest = request.body.name;
        let podcasterRequest = request.body.podcaster;
        let topicRequest = request.body.topic;
        let starsRequest = request.body.stars;

        let newPodcast = {
            id: Math.floor(Date.now() * Math.random()).toString(36),
            name: nameRequest,
            podcaster: podcasterRequest,
            topic: topicRequest,
            stars: starsRequest,

        };
        podcastsJson.push(newPodcast),
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

const updatePods = (request, response) =>{
    const idRequest = request.params.id
    const starsRequest = request.body.stars
    starsFind = podcastsJson.find((podcast) => podcast.id == idRequest)

    if(starsFind) {
        starsFind.stars = starsRequest
        response.status(201).json([{
            message: 'Classificacao atualizada',
            starsFind
        }])
    } else{
        response.status(404).json([{
            message: 'Nao foi modificado'
        }])
    }
}

const deletePods = (request, response) =>{
    const idRequest = request.params.id
    const indicePods = podcastsJson.findIndex((podcast)=> podcast.id == idRequest)
    podcastsJson.splice(indicePods, 1)

    if (indicePods) {
    response.status(200).json([{
        message: 'Podcast deletado',
        'Podcast deletado': idRequest,
        
    }])
    } else{
        response.status(404).send([{
            message: 'Podcast nao deletado'
        }])
    }






        
    
}
module.exports ={
    getAllPods,
    getTopics,
    addPods,
    updatePods,
    deletePods

}
