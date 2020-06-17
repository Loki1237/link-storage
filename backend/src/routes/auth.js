const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getRepository } = require('typeorm');
const verifyAuthToken = require('../middleware/verify-auth-token');

const login = async (req, res) => {
    const userRepository = getRepository("Users");
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).send("Please enter your username and password");
    }

    const user = await userRepository.findOne({ login });

    if (!user) {
        return res.status(401).send("Invalid login or password");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
        const AUTH_TOKEN = await jwt.sign({ id: user.id, login: user.login }, process.env.AUTH_TOKEN_PRIVATE_KEY);
        
        return res.status(200)
                  .cookie("AUTH_TOKEN", AUTH_TOKEN, { maxAge: 2592000000, httpOnly: true })
                  .send();
    } else {
        return res.status(401).send("Invalid login or password");
    }
}

const loginAs = async (req, res) => {
    const decodedAuthToken = await verifyAuthToken(req.cookies.AUTH_TOKEN);

    if (!decodedAuthToken) {
        return res.status(401).send();
    }

    const userRepository = getRepository("Users");
    const user = await userRepository.findOne({ id: decodedAuthToken.id });

    if (!user) {
        return res.status(401).send();
    }

    return res.status(200)
              .cookie("AUTH_TOKEN", req.cookies.AUTH_TOKEN, { maxAge: 2592000000, httpOnly: true })
              .send();
}

const signUp = async (req, res) => {
    const userRepository = getRepository("Users");
    const userIsExist = await userRepository.findOne({ login: req.body.login });

    if (userIsExist) {
        return res.status(400).send("A user with this login already exists");
    }

    const templates = {
        name: /[^a-zа-я-]/i,
        login: /[^a-z0-9_]/i,
        password: /[^a-z0-9_-]/i,
        PIN: /[^0-9]/
    }

    if (templates.name.test(req.body.name)) {
        return res.status(400).send("Incorrect name");
    } 
    
    if (templates.login.test(req.body.login)) {
        return res.status(400).send("Incorrect login");
    } 
    
    if (templates.password.test(req.body.password)) {
        return res.status(400).send("Incorrect password");
    } 
    
    if (templates.PIN.test(req.body.PIN)) {
        return res.status(400).send("Incorrect PIN");
    }

    const passwordHash = await bcrypt.hash(req.body.password, process.env.PASSWORD_HASH_SALT_ROUNDS);
    const user = await userRepository.create({
        name: req.body.name,
        login: req.body.login,
        password: passwordHash,
        PIN: req.body.PIN,
        showHidden: false
    });
    await userRepository.save(user);

    return res.status(200).send();
}

const logout = (req, res) => {
    return res.clearCookie('AUTH_TOKEN').send();
}

const authRouter = () => {
    const router = express.Router();

    router.post('/login', login);
    router.post('/login-as', loginAs);
    router.post('/sign-up', signUp);
    router.head('/logout', logout);

    return router;
}

module.exports = authRouter;
