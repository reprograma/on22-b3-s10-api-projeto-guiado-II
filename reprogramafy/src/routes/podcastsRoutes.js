const podcastsController = require('../controllers/podcastsController');
const express = require('express');
const router = express.Router();

// router.metodoHttp(rota, função);

router.get('/library', podcastsController.getAllPodcasts); //ok

router.get('/library/topic', podcastsController.getTopics); //ok

router.post('/add', podcastsController.addPodcast); //ok

router.patch('/update/:id', podcastsController.updatePodcast); //ok

router.delete('/delete/:id', podcastsController.deletePodcast); //ok


module.exports = router;