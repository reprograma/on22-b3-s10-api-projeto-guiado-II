const podcastsJson = require('../models/podcasts.json');


const getAllPodcasts = (req, res) => {
    try {
        res.status(200).json([{
            podcasts: podcastsJson
        }]);
    } catch (error) {
        res.status(500).send([{
            msg: `erro no server: ${error}`
        }]);
    }
}

const getTopics = (req, res) => {
    try {
        const topicReq = req.query.topic.toLocaleLowerCase();
        const topicFilter = podcastsJson.filter((podcast) => podcast.topic.toLocaleLowerCase().includes(topicReq))

        if (topicFilter.length > 0) {
            res.status(200).json([{
                topics: topicFilter
            }])
        } else {
            res.status(404).send("404: Request Not found!")
        }
    } catch (error) {
        res.status(500).send([{
            msg: `erro no server: ${error}`
        }]);
    }
}

const addPodcast = (req, res) => {
    try {
        const newPodcast = {
            "id": Math.floor(Date.now() * Math.random()).toString(36),
            "name": req.body.name,
            "podcaster": req.body.podcaster,
            "topic": req.body.topic,
            "stars": req.body.stars
        }

        podcastsJson.push(newPodcast);
        res.status(201).json([{
            message: "Adicionado com sucesso!", newPodcast
        }])
    } catch (error) {
        console.log(error)
        res.status(500).send([{
            msg: `Erro interno ao cadastrar.`
        }]);
    }
}

const updatePodcast = (req, res) => {
    const idRequest = req.params.id;
    const starsRequest = req.body.stars;
    starsFind = podcastsJson.find((podcast) => podcast.id == idRequest);

    if (starsFind) {
        starsFind.stars = starsRequest;
        res.status(200).json([{
            message: "Classificação atualizada com sucesso!!!",
            podcastsJson
        }])
    } else {
        res.status(404).json([{
            message: "Não foi modificado!!!"
        }])
    }
}

const deletePodcast = (req, res) => {
    const idRequest = req.params.id;
    const indicePods = podcastsJson.findIndex((podcast) => podcast.id == idRequest);

    podcastsJson.splice(indicePods, 1)

    if (indicePods) {
        res.status(200).json([{
            message: "O podcast deletado!!",
            "podcast deletado": idRequest,
            podcastsJson
        }])
    } else {
        res.status(404).send([{
            message: "Podcast não deletado!!"
        }])
    }
}


module.exports = {
    getAllPodcasts,
    getTopics,
    addPodcast,
    updatePodcast,
    deletePodcast
}