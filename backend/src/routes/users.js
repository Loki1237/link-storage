const express = require('express');
const bcrypt = require('bcrypt');
const { getRepository } = require('typeorm');
const verifyAuthToken = require('../middleware/verify-auth-token');

const changePassword = async (req, res) => {
    const decodedAuthToken = await verifyAuthToken(req.cookies.AUTH_TOKEN);

    if (!decodedAuthToken) {
        return res.status(401).send();
    }

    const userRepository = getRepository("Users");
    const user = await userRepository.findOne({ id: decodedAuthToken.id });

    const validPassword = await bcrypt.compare(req.body.oldPassword, user.password);
    
    if (validPassword) {
        const passwordHash = await bcrypt.hash(req.body.newPassword, process.env.PASSWORD_HASH_SALT_ROUNDS);
        await userRepository.merge(user, { password: passwordHash });
        await userRepository.save(user);
    } else {
        return res.status(400).send("Incorrect password");
    }

    return res.status(200).send();
}

const changePIN = async (req, res) => {
    const decodedAuthToken = await verifyAuthToken(req.cookies.AUTH_TOKEN);

    if (!decodedAuthToken) {
        return res.status(401).send();
    }

    const userRepository = getRepository("Users");
    const user = await userRepository.findOne({ id: decodedAuthToken.id });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    
    if (validPassword) {
        await userRepository.merge(user, { PIN: req.body.newPIN });
        await userRepository.save(user);
    } else {
        return res.status(400).send("Incorrect password");
    }

    return res.status(200).send();
}

const changeShowHidden = async (req, res) => {
    const decodedAuthToken = await verifyAuthToken(req.cookies.AUTH_TOKEN);

    if (!decodedAuthToken) {
        return res.status(401).send();
    }

    const userRepository = getRepository("Users");
    const user = await userRepository.findOne({ id: decodedAuthToken.id });

    if (!req.body.PIN) {
        await userRepository.merge(user, { showHidden: false });
        await userRepository.save(user);

        return res.status(200).send();
    }

    if (req.body.PIN === user.PIN) {
        await userRepository.merge(user, { showHidden: true });
        await userRepository.save(user);

        return res.status(200).send();
    } else {
        return res.status(400).send("Incorrect PIN");
    }
}

const deleteUser = async (req, res) => {
    const decodedAuthToken = await verifyAuthToken(req.cookies.AUTH_TOKEN);

    if (!decodedAuthToken) {
        return res.status(401).send();
    }

    const linkRepository = getRepository("Links");
    await linkRepository.delete({ userID: decodedAuthToken.id });

    const userRepository = getRepository("Users");
    await userRepository.delete({ id: decodedAuthToken.id });

    return res.sendStatus(200);
}

const userRouter = () => {
    const router = express.Router();

    router.put('/password', changePassword);
    router.put('/PIN', changePIN);
    router.put('/show_hidden', changeShowHidden);
    router.delete('/', deleteUser);

    return router;
}

module.exports = userRouter;
