const express = require('express');
const router = express.Router();
const typeorm = require("typeorm");

typeorm.createConnection().then( connection => {
    const linkRepository = connection.getRepository("Links");

    router.get('/:userID', async function(req, res) {
        const links = await linkRepository.find({ userID: req.params.userID });
        res.json(links);
    });

    router.post('/', async function(req, res) {
        const link = await linkRepository.create(req.body);
        await linkRepository.save(link);
        return res.sendStatus(200);
    })

    router.put('/:id', async function(req, res) {
        const link = await linkRepository.findOne({ id: req.params.id });
        await linkRepository.merge(link, req.body);
        await linkRepository.save(link);
        return res.sendStatus(200);
    })

    router.delete('/:id', async function(req, res) {
        await linkRepository.delete({ id: req.params.id });
        return res.sendStatus(200);
    });

    router.delete('/all/:userID', async function(req, res) {
        await linkRepository.delete({ userID: req.params.userID });
        return res.sendStatus(200);
    });

});

module.exports = router;
