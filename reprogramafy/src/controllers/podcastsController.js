//const { randomFill } = require("crypto")
const podsJson = require("../models/podcasts.json")
//const { updatePods } = require("./podcastsController")
const getAllPods = (req, res) =>{
    try{
        res.status(200).json([{
            podcasts: podsJson
        }])
    } catch(err){
        res.status(500).send([{
            menssagem:"erro no server"
        }])
    }
}
const getTopics = (req, res) =>{
const topicRequest = req.query.topic;
const topicFilter = podsJson.filter((pods) => pods.topic.includes(topicRequest))
 if(topicFilter.length > 0) {
    res.status(200).send(topicFilter)
 } else {
    res.status(404).send([{
        message: "Podcast not found"
    }])
 }
}

const addPods = (req, res) =>{
    try{
    let nomeRequest = req.body.nome;
    let podcasterRequest = req.body.podcaster;
    let topicRequest = req.body.topic;
    let starsRequest = req.body.stars; 

    let newPods = {
        id: Math.floor(Date.now() * Math.random()).toString(36),
        nome: nomeRequest,
        podcaster: podcasterRequest,
        topic: topicRequest,
        stars: starsRequest,
        
    }
    podsJson.push(newPods);
    res.status(201).json([{
        message: "novo podcast cadastrado", newPods
    }])

} catch (error) {
    console.log(error)
    res.status(500).send([{
        message: "erro interno ao cadastrar"
    }])
}
} 
const updatePods = (req, res) =>{
    const idRequest = req.params.id
    const starsRequest = req.body.stars
    starsFind = podsJson.find((podcast) =>podcast.id == idRequest)
    if(starsFind) {
        starsFind.stars = starsRequest
        res.status(200).json([{
            message: "classificação atualizada com sucesso", podsJson
        }])
    } else{
        res.status(404).json([{
            messager: "não foi modificado"
        }])
    }
}
const deletePods = (req, res)=>{
const idRequest = req.params.id
const indicePods = podsJson.findIndex((podcast)=> podcast.id == idRequest)
podsJson.splice(indicePods, 1)
if(indicePods){
    res.status(200).json([{
        message: "podcast deletado",
        "podcast deletado": idRequest, podsJson
    }])
} else {
    res.status(404).send([{
        message: "podcast não deletado"
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