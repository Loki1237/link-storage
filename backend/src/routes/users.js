const express = require('express');
const router = express.Router();
const typeorm = require('typeorm');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 12;
const privateKey = "jf7w3jfwkd8k7b2";

typeorm.createConnection().then(connection => {
    const userRepository = connection.getRepository("Users");
    
    router.get('/find/:login', async function(req, res) {
        const user = await userRepository.findOne({ 
            login: req.params.login
        });

        if (user) {
            res.send(true);
        } else {
            res.send(false);
        }
    });

    router.get('/login/:login/:password', async function(req, res) {
        const user = await userRepository.findOne({ login: req.params.login });
        const check = user 
            ? await bcrypt.compare(req.params.password, user.password) 
            : false;

        if (check) {
            const token = await jwt.sign({ id: user.id, login: user.login }, privateKey);
            res.json({
                id: user.id,
                name: user.name,
                login: user.login,
                show: user.show,
                token
            });
        } else {
            res.json({ error: "not found" });
        }
    });

    router.get('/token/:token', async function(req, res) {
        const decoded = await jwt.verify(req.params.token, privateKey);
        const user = await userRepository.findOne({ id: decoded.id, login: decoded.login });

        if (user) {
            res.json({
                id: user.id,
                name: user.name,
                login: user.login,
                show: user.show
            });
        } else {
            res.json({ error: "not found" });
        }
    });

    router.post('/', async function(req, res) {
        const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
        const user = await userRepository.create({
            name: req.body.name,
            login: req.body.login,
            password: passwordHash,
            PIN: req.body.PIN,
            show: "visible"
        });
        await userRepository.save(user);

        return res.sendStatus(200);
    });

    router.put('/:id', async function(req, res) {
        const PIN = req.body.PIN;
        const user = await userRepository.findOne({ id: req.params.id });

        const passwordCheck = req.body.password 
            ? await bcrypt.compare(req.body.password, user.password) 
            : null;
        
        if (req.body.newPassword) {
            if (passwordCheck) {
                const passwordHash = await bcrypt.hash(req.body.newPassword, saltRounds);
                await userRepository.merge(user, { password: passwordHash });
            } else {
                return res.status(400).send({
                    error: "Incorrect password"
                });
            }
        }
        
        if (req.body.newPIN) {
            if (passwordCheck) {
                await userRepository.merge(user, { PIN: req.body.newPIN });
            } else {
                return res.status(400).send({
                    error: "Incorrect password"
                });
            }
        }

        if (req.body.show) {
            if (PIN === user.PIN) {
                await userRepository.merge(user, { 
                    show: user.show === "visible" ? "all" : "visible"
                });
            } else {
                return res.status(400).send({
                    error: "Incorrect PIN"
                });
            }
        }

        await userRepository.save(user);

        return res.status(200).send({ 
            success: "OK"
        });
    });

    router.delete('/:id', async function(req, res) {
        await userRepository.delete({ id: req.params.id });

        return res.sendStatus(200);
    });

});

module.exports = router;

