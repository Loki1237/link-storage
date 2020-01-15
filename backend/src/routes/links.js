const express = require('express');
const router = express.Router();
const typeorm = require('typeorm');

typeorm.createConnection().then(connection => {
    const linkRepository = connection.getRepository("Links");
    const userRepository = connection.getRepository("Users");

    router.get('/:userID', async function(req, res) {
        const user = await userRepository.findOne({ id: req.params.userID });

        const allLinks = await linkRepository.find({ userID: req.params.userID });
        const visibleLinks = allLinks.filter(item => item.isVisible);

        res.json(user.show === "all" ? allLinks : visibleLinks);
    });

    router.post('/', async function(req, res) {
        const link = await linkRepository.create(req.body);
        await linkRepository.save(link);
        return res.sendStatus(200);
    });

    router.put('/:id', async function(req, res) {
        const link = await linkRepository.findOne({ id: req.params.id });
        await linkRepository.merge(link, req.body);
        await linkRepository.save(link);
        return res.sendStatus(200);
    });

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
