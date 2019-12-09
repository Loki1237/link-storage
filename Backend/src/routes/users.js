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
  }
})

sequelize.sync().then(
  result => console.log(result),
  error => console.log(error)
);

router.get('/', function(req, res, next) {
  User.findAll({
    raw: true
  }).then(
    users => res.json(users),
    error => console.log(error)
  )
});

router.post('/', function(req, res) {
  let user = req.body;
  User.create({
    name: user.name,
    login: user.login,
    password: user.password,
    PINcode: user.PINcode
  })
  res.sendStatus(200);
})

router.put('/', function(req, res) {
  let user = req.body;
  User.update({ 
    password: user.password,
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

