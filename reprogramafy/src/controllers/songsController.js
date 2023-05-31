const songsJson = require('../models/songs.json');


const getAllSongs = (req, res) => {
    try {
        res.status(200).json([{
            songs: songsJson
        }]);
    } catch (error) {
        res.status(500).send([{
            msg: `erro no server: ${error}`
        }]);
    }
}

const getSong = (req, res) => {
    try {
        const songID = req.params.id;
        const findSong = songsJson.filter(song => song.id == songID);

        if (findSong.length > 0) {
            res.status(200).json([{
                song: findSong
            }])
        } else {
            res.status(404).send([{
                message: "Busca não encontrou resultados."
            }])
        }
    } catch (error) {
        res.status(500).send([{
            msg: `erro no server: ${error}`
        }]);
    }
}

const getArtist = (req, res) => {
    try {
        let artistReq = req.query.artists.toLocaleLowerCase();
        let artistsFilter = songsJson.filter((song) => {
            const artistsLowerCase = song.artists.map((artistsArray) => artistsArray.toLowerCase())
            return artistsLowerCase.includes(artistReq)
        })

        console.log(artistsFilter);
        if (artistsFilter.length > 0) {
            res.status(200).send(artistsFilter)
        } else {
            res.status(404).json([{
                message: "Busca não encontrou resultados."
            }])
        }
    } catch (error) {
        res.status(500).send([{
            msg: `erro no server: ${error}`
        }]);
    }
}

const addSong = (req, res) => {
    try {
        const newSong = {
            "id": Math.floor(Date.now() * Math.random()).toString(36),
            "title": req.body.title,
            "launchYear": req.body.launchYear,
            "favorited": false,
            "artists": req.body.artists
        }

        songsJson.push(newSong)
        res.status(201).json([{
            message: "Adicionado com sucesso!", newSong
        }])
    } catch (error) {
        console.log(error)
        res.status(500).send([{
            msg: `Erro interno ao cadastrar.`
        }]);
    }
}

const updateSong = (req, res) => {
    try {
        const updatedSong = { id: req.params.id };

        const indexSong = songsJson.findIndex((song) => song.id == updatedSong.id);

        if (indexSong === -1) {
            res.status(404).json([{
                message: "Not Found!"
            }])
        } else {
            Object.assign(updatedSong, req.body)
            updatedSong.favorited = false;

            songsJson.splice(indexSong, 1, updatedSong)
            res.status(200).json([{
                message: "Alterada com sucesso!", updatedSong
            }])

        }
    } catch (error) {
        res.status(500).send([{
            msg: `erro no server: ${error}`
        }]);
    }
}

const deleteSong = (req, res) => {
    try {
        const reqID = req.params.id;
        const indexSong = songsJson.findIndex((song) => song.id == reqID);

        songsJson.splice(indexSong, 1);
        if (indexSong != -1) {
            res.status(200).json([{
                message: "A música selecionada foi apagada com sucesso!",
                'musica deletada': reqID,
                songsJson
            }])
        } else {
            res.status(404).send([{
                message: "Música não encontrada!"
            }])
        }
    } catch (error) {
        res.status(500).send([{
            msg: `erro no server: ${error}`
        }]);
    }
}

const updateFav = (req, res) => {
    try {
        const reqID = req.params.id;
        favoritedFind = songsJson.find((song) => song.id == reqID);

        if (favoritedFind === undefined) {
            res.status(404).json([{
                message: "Not found!"
            }])
        } else if ((favoritedFind.favorited === true) || favoritedFind.favorited === false) {
            favoritedFind.favorited = !(favoritedFind.favorited);
            res.status(200).json([{
                message: "Classificação atualizada com Sucesso!!"
            }])
        } else {
            res.status(404).json([{
                message: "An unknown error has occured."
            }])
        }
    } catch (error) {
        res.status(500).send([{
            msg: `erro no server: ${error}`
        }]);
    }
}

module.exports = {
    getAllSongs,
    getSong,
    getArtist,
    addSong,
    updateSong,
    deleteSong,
    updateFav
}