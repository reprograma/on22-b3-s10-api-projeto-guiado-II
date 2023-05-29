const podsJson = require("../models/podcasts.json")

const getAllPods = (req,res)=>{
    try {
        res.status(200).json([{
            podcasts : podsJson
        }])
    } catch (error) {
        res.status(500).send([{message :"Erro no server"}])
    }
}
const getTopics =(req,res)=>{
    const topicReq = req.query.topic
    const topicFilter = podsJson.filter((pods)=> pods.topic.includes(topicReq))
    if (topicFilter.length > 0) {
        res.status(200).send(topicFilter)
    } else {
        res.status(404).send([{
            message:"Not found"
        }])
    }
}
const addPods = (req,res)=>{
    try {
        let nameReq = req.body.name;
        let podcasterReq = req.body.podcaster;
        let topicReq = req.body.topic;
        let starsReq = req.body.stars;

        let newPodcast = {
            id: Math.floor(Date.now()*Math.random()).toString(36),
            name: nameReq,
            podcaster: podcasterReq,
            topic: topicReq,
            stars: starsReq
        }
        podsJson.push(newPodcast);
        res.status(201).json([{
            message: "Novo podcast cadastrado",
            newPodcast
        }])

    } catch (error) {
        console.log(error),
        res.status(500).send([{ message: "erro ao cadastrar podcast"}])
    }
}
const updatePods = (req,res)=>{
    const idRequest= req.params.id
    const starsReq = req.body.stars
    starsFind = podsJson.find((podcast)=>podcast.id == idRequest)
    if (starsFind) {
       starsFind.stars = starsReq
       res.status(200).json([{
        message:"Classificaçao atualizada com sucesso",
        podsJson
       }]) 
    } else {
        res.status(404).json([{message:"Musica não modificada garota"}])
    }
}
const deletePods = (req,res)=>{
    const idRequest = req.params.id
    const findPod = podsJson.findIndex((podcast)=> podcast.id == idRequest)
    if (findPod) {
        podsJson.splice(findPod,1)
        res.status(200).json([{
            message: "podcast deletado",
            "podcast deletado": idRequest,
            podsJson
        }])
    } else {
        res.status(404).json([{
            message:"Podcaast não deletado"
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