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
  userID: {
    type: Sequelize.TEXT,
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
  id: {
    type: Sequelize.TEXT,
    primaryKey: true,
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

router.get('/', function(req, res, next) {
  Link.findAll({raw:true}).then(
    links => res.json(links),
    error => console.log(error)
  )
});

router.post('/', function(req, res) {
  let link = req.body;
  Link.findAll({
    raw: true,
    where: {
      userID: link.userID
    }
  }).then(
    links => {
      let linkID = `${Math.random()}`.substr(2, 4);
      let isUniqueID = true;
      while( linkID ) {
        for( let i = 0; i < links.length; i++ ) {
          if( linkID === links[i].id ) {
            isUniqueID = false;
            break;
          } else {
            isUniqueID = true;
          }
        }
        if( isUniqueID ) {
          break;
        } else {
          linkID = `${Math.random()}`.substr(2, 4);
        }
      }

      Link.create({
        userID: link.userID,
        name: link.name,
        URL: link.URL,
        id: linkID,
        isVisible: link.isVisible
      })
    },
    error => console.log(error)
  )
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

module.exports = router;
