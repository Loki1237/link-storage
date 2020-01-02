const express = require('express');
const router = express.Router();
const Sequelize = require("sequelize");

const sequelize = new Sequelize("links_storage", "joni", "12345678", {
    dialect: "postgres",
    host: "localhost",
    define: {
        timestamps: false
    }
});

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    login: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    PINcode: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    token: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

sequelize.sync().then(
    result => console.log(result),
    error => console.log(error)
);

function encrypt( password ) {
    let encrypted = [];
    for(key of password) {
        encrypted.push(key.codePointAt(0) ^ 54);
    }
    return encrypted.join(".");
}

function decrypt( password ) {
    let decrypted = password.split(".");
    for(let i = 0; i < decrypted.length; i++) {
        decrypted[i] = String.fromCodePoint(decrypted[i] ^ 54);
    }
    return decrypted.join("");
}

function setToken( login, password ) {
    let string = `${login}${password}`;
    let token = "";
    for(let i = 0; i < string.length; i++) {
        token += string[i].codePointAt(0) ^ 54;
    }
    return token;
}

router.get('/:login', function(req, res) {
    User.findOne({
        where: {
            login: req.params.login
        }
    }).then(
        user => {
            if( user ) {
                user.password = decrypt( user.password );
                res.json(user);
            } else {
                res.json({ error: "not found" });
            }
        },
        error => console.log(error)
    )
});

router.get('/token/:token', function(req, res) {
    User.findOne({
        where: {
            token: req.params.token
        }
    }).then(
        user => {
            if( user ) {
                user.password = decrypt( user.password );
                res.json(user);
            } else {
                res.json({ error: "not found" });
            }
        },
        error => res.send(error)
    )
});

router.post('/', function(req, res) {
    let user = req.body;
    User.create({
        name: user.name,
        login: user.login,
        password: encrypt(user.password),
        PINcode: user.PINcode,
        token: setToken(user.login, user.password)
    })
    res.sendStatus(200);
})

router.put('/', function(req, res) {
    let user = req.body;
    User.update({ 
        password: encrypt(user.password),
        PINcode: user.PINcode
    }, {
        where: {
            id: user.id
        }
    })
    res.sendStatus(200);
})

router.delete('/', function(req, res) {
    let user = req.body;
    User.destroy({
        where: {
            id: user.id
        }
    })
    res.sendStatus(200);
});

module.exports = router;

