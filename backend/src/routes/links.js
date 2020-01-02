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

const Link = sequelize.define("link", {
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
    URL: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    userID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isVisible: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

sequelize.sync().then(
    result => console.log(result),
    error => console.log(error)
);

router.get('/:userID', function(req, res, next) {
    Link.findAll({
        where: {
            userID: req.params.userID
        }
    }).then(
        links => res.json(links),
        error => console.log(error)
    )
});

router.post('/', function(req, res) {
    let link = req.body;
    Link.create({
        userID: link.userID,
        name: link.name,
        URL: link.URL,
        isVisible: link.isVisible
    })
    res.sendStatus(200);
})

router.put('/', function(req, res) {
    let link = req.body;
    Link.update({ 
        name: link.name, 
        URL: link.URL,
        isVisible: link.isVisible
    }, {
        where: {
            id: link.id,
            userID: link.userID
        }
    })
    res.sendStatus(200);
})

router.delete('/', function(req, res) {
    let link = req.body;
    Link.destroy({
        where: {
            id: link.id,
            userID: link.userID
        }
    })
    res.sendStatus(200);
});

router.delete('/:userID', function(req, res) {
    Link.destroy({
        where: {
            userID: req.params.userID
        }
    })
    res.sendStatus(200);
});

module.exports = router;
