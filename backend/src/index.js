const express = require('express');
const bodyParser = require('body-parser');
const typeorm = require("typeorm");

const home = require('./routes/home');
const users = require('./routes/users');
const links = require('./routes/links');

const app = express();
const port = 3001;

typeorm.createConnection().then( () => {
    app.use(bodyParser.json());

    app.use('/api', home);
    app.use('/api/users', users);
    app.use('/api/links', links);

    app.listen(port, () => console.log(`Server is running on port ${port}`));
} );

