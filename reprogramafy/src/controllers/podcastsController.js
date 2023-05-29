const { json } = require('express')
const podsJson = require('../models/podcasts.json')
const { addSong } = require('./songsController')

const getAllPods = (req,res) =>{
    try {
        res.status(200).json([{
            podcasts: podsJson
        }])
    } catch (err) {
        res.status(500).send([{
            message: 'Server error'
        }])
    }
}

const getByTopic = (req,res)=>{
    const topicRequest = req.query.topic
    const topicFilter = podsJson.filter((pods)=> pods.topic.includes(topicRequest))
    if(topicFilter.length>0){
        res.status(200).send(topicFilter)
    } else {
        res.status(404).send([{
            message: 'Not found'
        }])
    }
}

const addPods = (req,res)=>{
    try {
        let nameRequest = req.body.nameRequest
        let podcasterRequest = req.body.podcaster 
        let topicRequest = req.body.topic
        let starsRequest = req.body.stars
        
        const newPod = {
            id: Math.floor(Date.now() * Math.random()).toString(36),
            name: nameRequest,
            podcaster: podcasterRequest,
            topic: topicRequest,
            stars: starsRequest
        }

        podsJson.push(newPod)
        
        res.status(201).json([{
            message: 'New podcast registered',
            newPod
        }])
    } catch (error) {
        console.log(error)
        res.status(500).send([{
            message: 'Registration error'
        }])
    }
}

const updatePodById = (req,res)=>{
    const idRequest = req.params.id
    const starsRequest = req.body.stars

    starsFind = podsJson.find((pod)=> pod.id == idRequest)

    if(starsFind){
        starsFind.stars = starsRequest
        res.status(200).json([{
            message: 'Starts updated',
            podsJson
        }])
    } else {
        res.status(404).json([{
            message: 'Not updated'
        }])
    }
}

const deletePodById = (req,res) =>{
    const idRequest = req.params.id
    let indicePods = podsJson.findIndex((pod)=> pod.id == idRequest) //indicePods é o mesmo que findPods

    podsJson.splice(indicePods, 1)

    if (indicePods) {
        res.status(200).json([{
            message: 'Podcast deleted',
            'Deleted podcast': idRequest,
            podsJson
        }])
    } else {
        res.status(404).send([{
            message: 'Not found'
        }])
    }

}


module.exports = {
    getAllPods,
    getByTopic,
    addPods,
    updatePodById,
    deletePodById
}