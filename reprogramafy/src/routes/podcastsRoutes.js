const podcastsController = require('../controllers/podcastsController')
const express = require('express')
const router = express.Router() // funcao dde rotas do express

//router.metodosHttp(rota, funcao)
router.get('/library', podcastsController.getAllPods);
router.get('/library/topic', podcastsController.getTopics);
router.post('/add', podcastsController.addPods);
router.patch('/update/:id', podcastsController.updatePods);
router.delete('/delete/:id', podcastsController.deletePods);

module.exports = router