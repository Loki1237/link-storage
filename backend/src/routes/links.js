const express = require('express');
const { getRepository } = require('typeorm');
const verifyAuthToken = require('../middleware/verify-auth-token');

const getLinks = async (req, res) => {
    const decodedAuthToken = await verifyAuthToken(req.cookies.AUTH_TOKEN);

    if (!decodedAuthToken) {
        return res.status(401).send();
    }

    const userRepository = getRepository("Users");
    const user = await userRepository.findOne({ id: decodedAuthToken.id });

    if (!user) {
        return res.status(401).send();
    }

    const options = {
        userID: user.id,
        isVisible: true
    };

    if (user.showHidden) {
        delete options.isVisible;
    }

    const linkRepository = getRepository("Links");
    const links = await linkRepository.find({ 
        where: options,
        order: {
            id: "DESC"
        }
    });

    return res.status(200).json({ links, show: user.showHidden ? "all" : "visible" }).end();
}

const createLink = async (req, res) => {
    const decodedAuthToken = await verifyAuthToken(req.cookies.AUTH_TOKEN);

    if (!decodedAuthToken) {
        return res.status(401).send();
    }

    const linkRepository = getRepository("Links");
    const link = await linkRepository.create({
        name: req.body.name,
        URL: req.body.URL,
        userID: decodedAuthToken.id,
        isVisible: req.body.isVisible
    });
    await linkRepository.save(link);

    return res.status(200).send();
}

const changeLink = async (req, res) => {
    const decodedAuthToken = await verifyAuthToken(req.cookies.AUTH_TOKEN);

    if (!decodedAuthToken) {
        return res.status(401).send();
    }

    const linkRepository = getRepository("Links");
    const link = await linkRepository.findOne({ id: +req.params.id, userID: decodedAuthToken.id });

    await linkRepository.merge(link, req.body);
    await linkRepository.save(link);

    return res.status(200).send();
}

const deleteLink = async (req, res) => {
    const decodedAuthToken = await verifyAuthToken(req.cookies.AUTH_TOKEN);

    if (!decodedAuthToken) {
        return res.status(401).send();
    }

    const linkRepository = getRepository("Links");
    await linkRepository.delete({ id: +req.params.id, userID: decodedAuthToken.id });

    return res.status(200).send();
}

const linkRouter = () => {
    const router = express.Router();

    router.get('/', getLinks);
    router.post('/', createLink);
    router.put('/:id', changeLink);
    router.delete('/:id', deleteLink);

    return router;
}

module.exports = linkRouter;
