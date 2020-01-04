const express = require('express');
const router = express.Router();
const typeorm = require("typeorm");

function encrypt(password) {
    let encrypted = [];
    for (key of password) {
        encrypted.push(key.codePointAt(0) ^ 54);
    }
    return encrypted.join(".");
}

function decrypt(password) {
    let decrypted = password.split(".");
    for (let i = 0; i < decrypted.length; i++) {
        decrypted[i] = String.fromCodePoint(decrypted[i] ^ 54);
    }
    return decrypted.join("");
}

function setToken(login, password) {
    let string = `${login}${password}`;
    let token = "";
    for (let i = 0; i < string.length; i++) {
        token += string[i].codePointAt(0) ^ 54;
    }
    return token;
}

typeorm.createConnection().then( connection => {
    const userRepository = connection.getRepository("Users");

    router.get('/:login', async function(req, res) {
        const user = await userRepository.findOne({ login: req.params.login });
        if (user) {
            user.password = decrypt(user.password);
            res.json(user);
        } else {
            res.json({ error: "not found" });
        }
    })

    router.get('/token/:token', async function(req, res) {
        const user = await userRepository.findOne({ token: req.params.token });
        if (user) {
            user.password = decrypt(user.password);
            res.json(user);
        } else {
            res.json({ error: "not found" });
        }
    });

    router.post('/', async function(req, res) {
        const user = await userRepository.create({
            name: req.body.name,
            login: req.body.login,
            password: encrypt( req.body.password ),
            PINcode: req.body.PINcode,
            token: setToken( req.body.login, req.body.password )
        });
        await userRepository.save(user);
        return res.sendStatus(200);
    });

    router.put('/:id', async function(req, res) {
        let newProps = req.body;
        newProps.password = encrypt(req.body.password);
        const user = await userRepository.findOne({ id: req.params.id });
        await userRepository.merge(user, newProps);
        await userRepository.save(user);
        return res.sendStatus(200);
    })

    router.delete('/:id', async function(req, res) {
        await userRepository.delete({ id: req.params.id });
        return res.sendStatus(200);
    });

});

module.exports = router;

